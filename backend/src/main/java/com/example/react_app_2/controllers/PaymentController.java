package com.example.react_app_2.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    static {
        String key = System.getenv("STRIPE_SECRET_KEY");
        if (key != null && !key.isEmpty()) Stripe.apiKey = key;
    }

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, Object>> createIntent(@RequestBody CreateIntentRequest req) throws StripeException {
        Map<String, Object> out = new HashMap<>();
        // Ensure Stripe key is configured
        if (Stripe.apiKey == null || Stripe.apiKey.isEmpty()) {
            out.put("error", "Stripe secret key not configured (set STRIPE_SECRET_KEY)");
            return ResponseEntity.status(400).body(out);
        }

        long amount = req.amount != null && req.amount > 0 ? req.amount : 1000L;
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(amount)
            .setCurrency(req.currency == null ? "usd" : req.currency)
            .build();

        try {
            PaymentIntent intent = PaymentIntent.create(params);
            out.put("clientSecret", intent.getClientSecret());
            return ResponseEntity.ok(out);
        } catch (StripeException e) {
            out.put("error", e.getMessage());
            return ResponseEntity.status(502).body(out);
        }
    }

    public static class CreateIntentRequest {
        public Long amount; // in cents
        public String currency;
    }
}

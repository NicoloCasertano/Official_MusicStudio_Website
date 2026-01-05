package com.example.react_app_2.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PurchaseController {

    @PostMapping("/purchase")
    public ResponseEntity<Map<String, Object>> purchase(@RequestBody PurchaseRequest req) {
        Map<String, Object> out = new HashMap<>();
        out.put("status", "ok");
        out.put("userId", req.userId);
        out.put("beatId", req.beatId);
        return ResponseEntity.ok(out);
    }

    // Simple request DTO - public fields so Jackson can bind without setters
    public static class PurchaseRequest {
        public Integer userId;
        public Integer beatId;
    }

}

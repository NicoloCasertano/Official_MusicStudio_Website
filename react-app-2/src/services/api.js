const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5713/api'

async function handleJsonResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(res.status + ' ' + res.statusText + (text ? ' - ' + text : ''))
  }
  return res.status === 204 ? null : res.json()
}

export async function login(payload) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleJsonResponse(res)
}

export async function registerUser(payload) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return handleJsonResponse(res)
}

export async function updateProfile(id, changes) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    })
    return handleJsonResponse(res)
  } catch (err) {
    console.error('updateProfile network error', err)
    // Re-throw a clearer error for UI handling
    throw new Error('Network error: failed to reach server')
  }
}

// Users
export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`)
  return handleJsonResponse(res)
}

export async function getUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`)
  return handleJsonResponse(res)
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' })
  return handleJsonResponse(res)
}

// Beats
export async function getBeats() {
  const res = await fetch(`${API_BASE}/beats`)
  return handleJsonResponse(res)
}

export async function getAvailableBeats() {
  const res = await fetch(`${API_BASE}/beats/available`)
  return handleJsonResponse(res)
}

export async function getBeat(id) {
  const res = await fetch(`${API_BASE}/beats/${id}`)
  return handleJsonResponse(res)
}

export async function purchaseBeatExclusive(id, buyerEmail) {
  const res = await fetch(`${API_BASE}/beats/${id}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buyerEmail })
  })
  return handleJsonResponse(res)
}

export async function createBeat(payload) {
  const res = await fetch(`${API_BASE}/beats`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

export async function updateBeat(id, payload) {
  const res = await fetch(`${API_BASE}/beats/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return handleJsonResponse(res)
}

export async function deleteBeat(id) {
  const res = await fetch(`${API_BASE}/beats/${id}`, { method: 'DELETE' })
  return handleJsonResponse(res)
}

// Products
export async function getProducts() { return handleJsonResponse(await fetch(`${API_BASE}/products`)) }
export async function getProduct(id) { return handleJsonResponse(await fetch(`${API_BASE}/products/${id}`)) }
export async function createProduct(payload) { return handleJsonResponse(await fetch(`${API_BASE}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })) }
export async function updateProduct(id, payload) { return handleJsonResponse(await fetch(`${API_BASE}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })) }
export async function deleteProduct(id) { return handleJsonResponse(await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })) }

// Works
export async function getWorks() { return handleJsonResponse(await fetch(`${API_BASE}/works`)) }
export async function getWork(id) { return handleJsonResponse(await fetch(`${API_BASE}/works/${id}`)) }
export async function createWork(payload) { return handleJsonResponse(await fetch(`${API_BASE}/works`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })) }
export async function updateWork(id, payload) { return handleJsonResponse(await fetch(`${API_BASE}/works/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })) }
export async function deleteWork(id) { return handleJsonResponse(await fetch(`${API_BASE}/works/${id}`, { method: 'DELETE' })) }

export async function purchaseBeat(userId, beatId) {
  const res = await fetch(`${API_BASE}/purchase`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, beatId }) })
  return handleJsonResponse(res)
}

export default { API_BASE }
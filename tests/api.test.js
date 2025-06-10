import request from 'supertest'
import app from '../index'
import { describe, it, expect, beforeAll } from 'vitest'
import mongoose from 'mongoose'
import { beforeAll, afterAll } from 'vitest'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDgxNDgxZGQ2MjY3NTJlMzJmMmM0OSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTc0OTU2MzM5NCwiZXhwIjoxNzQ5NTY2OTk0fQ.R8DyTZt_esP9fFdi_zIZ5OibYDLSwEGpcWW2p5CliG8'
const categoryId = '684801558b06637618ee7ab6'
const lineId = '684801558b06637618ee7ab8'
const stopId1 = '684801558b06637618ee7aba'
const stopId2 = '684801558b06637618ee7abc'

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/tissea')
})

afterAll(async () => {
  await mongoose.disconnect()
})


describe('API Tisséa', () => {
  it('GET /api/categories/:id/lines - retourne les lignes', async () => {
    const res = await request(app)
      .get(`/api/categories/${categoryId}/lines`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/lines/:id/stops - retourne les arrêts d’une ligne', async () => {
    const res = await request(app)
      .get(`/api/lines/${lineId}/stops`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/stats/distance/stops/:id1/:id2 - calcule la distance entre 2 arrêts', async () => {
    const res = await request(app)
      .get(`/api/stats/distance/stops/${stopId1}/${stopId2}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(typeof res.body.distance).toBe('number')
  })

  it('GET /api/stats/distance/lines/:id - calcule la distance totale d’une ligne', async () => {
    const res = await request(app)
      .get(`/api/stats/distance/lines/${lineId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(typeof res.body.distance).toBe('number')
  })

  it('POST /api/users/signup - inscription', async () => {
    const res = await request(app).post('/api/users/signup').send({
      username: `user_${Date.now()}`,
      password: '123456'
    })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
  })

  it('POST /api/users/login - connexion', async () => {
    const res = await request(app).post('/api/users/login').send({
      username: 'test',
      password: '123456'
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('POST /api/lines/:id/stops - ajout d’un arrêt', async () => {
    const res = await request(app)
      .post(`/api/lines/${lineId}/stops`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Nouvel arrêt',
        latitude: 43.6,
        longitude: 1.44,
        order: 99
      })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('name')
  })

  it('PUT /api/lines/:id - modification d’une ligne', async () => {
    const res = await request(app)
      .put(`/api/lines/${lineId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ligne modifiée'
      })
    expect([200, 204]).toContain(res.status)
  })

  it('DELETE /api/lines/:id/stops/:id - suppression d’un arrêt', async () => {
    const res = await request(app)
      .delete(`/api/lines/${lineId}/stops/${stopId1}`)
      .set('Authorization', `Bearer ${token}`)
    expect([200, 204]).toContain(res.status)
  })
})

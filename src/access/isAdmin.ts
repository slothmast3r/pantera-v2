import type { Access } from 'payload'

export const requireLogin: Access = ({ req }) => Boolean(req.user)

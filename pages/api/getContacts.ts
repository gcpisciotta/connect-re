import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/initSupabase'

const getContacts = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.token

  const { data: contacts, error } = await supabase.from('contacts2').select()

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ contacts })
}

export default getContacts

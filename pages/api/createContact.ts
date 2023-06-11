import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/initSupabase';

const createContact = async (req: NextApiRequest, res: NextApiResponse) => {
  
  // console.log(req)
  console.log(req.body)

  const {name, email, phone, user_id} = req.body;

  console.log(name, email, phone, user_id);

  
  const { error } = await supabase
    .from('contacts')
    .insert({name, email, phone, user_id});

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(201).json({ });
};

export default createContact;

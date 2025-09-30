import { CONFIG } from '../../data/partners';

export default function handler(req, res) {
  res.status(200).json(CONFIG);
}

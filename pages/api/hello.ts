import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean;
  name: string;
  message: string;
  method: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  console.log(process.env);

  res.status(200).json({
    ok: true,
    name: 'Brandon García',
    message: '¡Todo Correcto!',
    method: req.method || 'No hay metodo',
  });

}

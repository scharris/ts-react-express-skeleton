import express, { Request, Response } from "express";
import * as FoosService from "./foos-service";
import {Foo} from 'dto';


export const router = express.Router();

router.get("/", async (req: Request, res: Response) =>
{
   try
   {
      const searchText = req.query.s as string || null;

      const foos: Foo[] = await FoosService.getFoos(searchText);

      res.status(200).send(foos);
   }
   catch (e)
   {
      res.status(404).send(e.message);
   }
});

router.get("/:id", async (req: Request, res: Response) =>
{
   const id: number = parseInt(req.params.id, 10);

   try
   {
      const foo: Foo | null = await FoosService.getFoo(id);

      if ( foo == null )
         res.sendStatus(404);
      else
         res.status(200).send(foo);
   }
   catch (e)
   {
      res.status(404).send(e.message);
   }
});

router.post("/", async (req: Request, res: Response) =>
{
   try
   {
      const foo: Foo = req.body.item;

      await FoosService.createFoo(foo);

      res.sendStatus(201);
   }
   catch (e)
   {
      res.status(404).send(e.message);
   }
});

router.put("/:id", async (req: Request, res: Response) =>
{
   try
   {
      const id: number = parseInt(req.params.id, 10);

      const foo: Foo = req.body.item;

      if ( id !== foo.id )
      {
         res.status(400);
         res.send('id in body does not match that of url');
         return;
      }
      else
      {
         await FoosService.updateFoo(foo.id, foo);
         res.sendStatus(200);
      }
   }
   catch(e)
   {
      res.status(500).send(e.message);
   }
});

router.delete("/:id", async (req: Request, res: Response) =>
{
   try
   {
      const id: number = parseInt(req.params.id, 10);

      await FoosService.removeFoo(id);

      res.sendStatus(200);
   }
   catch (e)
   {
      res.status(500).send(e.message);
   }
});

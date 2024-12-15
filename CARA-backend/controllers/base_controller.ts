import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

class BaseController<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // יצירת פריט חדש
  async create(req: Request, res: Response) {
    try {
      const newItem = await this.model.create(req.body as Partial<T>);
      res.status(201).json(newItem);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // קבלת כל הפריטים
  async getAll(req: Request, res: Response) {
    try {
      const items = await this.model.find({});
      res.status(200).json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // קבלת פריט יחיד לפי מזהה
  async getOne(req: Request, res: Response) {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // עדכון פריט לפי מזהה
  async update(req: Request, res: Response) {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body as Partial<T>,
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json(updatedItem);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // מחיקת פריט לפי מזהה
  async delete(req: Request, res: Response) {
    try {
      const deletedItem = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default BaseController;

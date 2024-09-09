import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './interfaces/log.interface';

@Injectable()
export class LogsService {
  constructor(@InjectModel('Log') private readonly logModel: Model<Log>) {}

  async create(log: Log): Promise<Log> {
    const newLog = new this.logModel(log);
    return await newLog.save();
  }

  async findAll(): Promise<Log[]> {
    return await this.logModel.find().exec();
  }

  async findOne(id: string): Promise<Log> {
    return await this.logModel.findById(id).exec();
  }

  async update(id: string, log: Log): Promise<Log> {
    return await this.logModel.findByIdAndUpdate(id, log, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return await this.logModel.findByIdAndDelete(id).exec();
  }
}
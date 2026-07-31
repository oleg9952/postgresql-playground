import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DatabaseService {
  private readonly filePath = join(process.cwd(), 'data', 'users.json');

  read<T>(): T[] {
    const raw = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  }

  write<T>(data: T[]): void {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}

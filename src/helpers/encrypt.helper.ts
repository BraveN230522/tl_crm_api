import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  static async hash(str, saltRounds = 1) {
    return await bcrypt.hash(str, saltRounds);
  }
  static compare(str, hash) {
    return bcrypt.compare(str, hash);
  }
}

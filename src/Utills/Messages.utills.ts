export class Messages {
  async getData(Data: string) {
    return `${Data} Retrieved successfully`;
  }
  async createData(Data: string) {
    return `${Data} Created successfully`;
  }
  async updateData(Data: string) {
    return `${Data} Updated successfully`;
  }
  async deleteData(Data: string) {
    return `${Data} Deleted successfully`;
  }
  async LoginData() {
    return ` Login successfully`;
  }
}

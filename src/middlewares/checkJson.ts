import { Request, Response, NextFunction } from 'express';

// Middleware kiểm tra xem req.body có phải là chuỗi JSON hợp lệ không
function checkJSON(req: Request, res: Response, next: NextFunction) {
  try {
    JSON.parse(req.body);
    next(); // Nếu parse JSON thành công, tiếp tục xử lý request
  } catch (error) {
    res.status(400).json({ error: 'req.body không phải là chuỗi JSON hợp lệ' });
  }
}

export default checkJSON;
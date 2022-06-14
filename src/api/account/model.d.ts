declare namespace Account {
  /** 登录参数 */
  type LoginVo = {
    username: string;
    password: string;
    captchaId: string;
    verifyCode: string;
  };
}

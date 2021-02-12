/**
 * 用户权限信息
 */
class UserSecurityContext implements SecurityContext {
  readonly userInfo: UserInfo;
  readonly roles: string[];
  readonly permissions: string[];

  constructor(permissions: string[], roles: string[], userInfo: UserInfo) {
    this.permissions = permissions;
    this.roles = roles;
    this.userInfo = userInfo;
  }

  hasRoles(...roles: string[]): boolean {
    return UserSecurityContext.hasAll(this.roles, ...roles);
  }

  hasPermissions(...permissions: string[]): boolean {
    return UserSecurityContext.hasAll(this.permissions, ...permissions);
  }

  hasAnyRoles(...roles: string[]): boolean {
    return UserSecurityContext.hasAny(this.roles, ...roles);
  }

  hasAnyPermissions(...permissions: string[]): boolean {
    return UserSecurityContext.hasAny(this.permissions, ...permissions);
  }

  public static hasAll(source: string[], ...target: string[]): boolean {
    if (!target || target.length <= 0) return true;
    if (!source || source.length <= 0) return false;
    let flag = true;
    target.forEach(item => {
      if (!flag) return;
      if (source.indexOf(item) < 0) {
        flag = false;
      }
    });
    return flag;
  }

  public static hasAny(source: string[], ...target: string[]) {
    if (!target || target.length <= 0) return true;
    if (!source || source.length <= 0) return false;
    let flag = false;
    target.forEach(item => {
      if (flag) return;
      if (source.indexOf(item) >= 0) {
        flag = true;
      }
    });
    return flag;
  }
}

export { UserSecurityContext }

import "vue-router";
declare module "vue-router" {
  interface RouteMeta {
    // 是可选的
    title?: string;
    icon?: string;
    // 每个路由都必须声明
    permissions?: string[] | undefined;
  }
}

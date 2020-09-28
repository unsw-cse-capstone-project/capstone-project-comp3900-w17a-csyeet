declare namespace AppCssNamespace {
  export interface IAppCss {
    App: string;
    "App-link": string;
    "App-logo": string;
    "App-logo-spin": string;
    active: string;
    header: string;
    logo: string;
    notActive: string;
  }
}

declare const AppCssModule: AppCssNamespace.IAppCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppCssNamespace.IAppCss;
};

export = AppCssModule;

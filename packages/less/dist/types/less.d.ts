type LessCompiler = {
    render(code: string, options: {
        javascriptEnabled: boolean;
        depends: boolean;
        compress: boolean;
        lint: boolean;
        paths: [];
        color: true;
        strictImports: boolean;
        insecure: boolean;
        rootpath: string | "";
        rewriteUrls: boolean;
        math: number | 1;
        strictUnits: boolean;
        globalVars: null;
        modifyVars: null;
        urlArgs: string;
        isFileProtocol: boolean;
        async: boolean;
        fileAsync: boolean;
        poll: 1500;
        env: unknown;
        useFileCache: true;
        onReady: true;
        plugins: [];
        logLevel: 1;
        loggers: [{}];
        mime: string | "text/css";
    });
};

/**
 * Less - Leaner CSS v4.1.3
 * http://lesscss.org
 *
 * Copyright (c) 2009-2023, Alexis Sellier <self@cloudhead.net>
 * Licensed under the Apache-2.0 License.
 *
 * @license Apache-2.0
 */

/**
 * @param {{object}}  [object={javascriptEnabled: false, depends: false, compress:false, lint:false, paths:[], color:true, strictImports:false, insecure:false, rootpath:"", rewriteUrls:false, math:1, strictUnits:false, globalVars:null, modifyVars:null, urlArgs:"", isFileProtocol:false, async:false, fileAsync:false, poll:1500, env:{}, useFileCache:true, onReady:true, plugins:[], logLevel:1, loggers:[{}], mime:text/css} ] - options
 */
declare var less: LessCompiler;

export default LessCompiler;
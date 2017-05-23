### dudy-cli

dudy-cli 帮助大家创建FE项目。


### install

```
npm i cnpm -g
npm i dudy-cli -g
cnpm i webpack -g
```

### Upgrade
```
# re-install dudy-cli to latest version
npm i dudy-cli -g

cd [your-project-name] 

dudy --upgrade react-single-page-app

```


### es6 index.js生成工具 


为整个项目目录生成index.js

```
dudy -i [target source folder]
```


为单个目录生成index.js
```
dudy -t dir -i [target source folder]
```

### 脚手架 - 单页面应用

```
# 创建单页面应用 
dudy -c react-single-page-app -n [your-project-name]

# dev project
cd [your-project-name]

# for windows
npm run dev_win [your-entry-name]

# for linux/mac
npm run dev [your-entry-name]
```


### 脚手架 - react组件库

创建项目
```
dudy -c react-component-library -n [your-library-name]

cd [your-library-name]
```


创建项目后，目录结构如下


├── example        // 组件库测试项目
└── src            // 组件库源代码


在example项目中引入组件

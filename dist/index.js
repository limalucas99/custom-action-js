/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 29:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 245:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(29);
const github = __nccwpck_require__(245);

async function run() {
  try {
    // Obtem os inputs da action
    const token = core.getInput('GITHUB_TOKEN');
    const issueId = core.getInput('issue-id');
    const comment = core.getInput('comment');

    // Inicializa o cliente do GitHub
    const octokit = github.getOctokit(token);

    // Obtem o contexto do repositório
    const context = github.context;
    const { owner, repo } = context.repo;

    // Adiciona um comentário ao issue ou pull request
    const response = await octokit.rest.issues.createComment({
      owner: owner,
      repo: repo,
      issue_number: issueId,
      body: comment,
    });

    // Obtenha o ID do comentário criado
    const commentId = response.data.id;

    // Define o output com o ID do comentário
    core.setOutput('comment-id', commentId);

    console.log('Comentário adicionado com sucesso! ID do comentário:', commentId);
  } catch (error) {
    core.setFailed(`Erro ao adicionar comentário: ${error.message}`);
  }
}

run();
module.exports = __webpack_exports__;
/******/ })()
;
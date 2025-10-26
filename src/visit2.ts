import { Node } from 'oxc-parser';

function _visitArray(narr: Node[] | undefined | null, fn: (n: Node) => void) {
  if (!narr) return;
  for (const n of narr) {
    visit(n, fn);
  }
}

function _visitOptional(n: Node | null | undefined, fn: (n: Node) => void) {
  if (n) visit(n, fn);
}

// Visitor functions for each node type
function visitProgram(n: Extract<Node, { type: 'Program' }>, fn: (n: Node) => void) {
  if (n.hashbang) visit(n.hashbang, fn);
  _visitArray(n.body, fn);
}

function visitArrayExpression(n: Extract<Node, { type: 'ArrayExpression' }>, fn: (n: Node) => void) {
  for (const e of n.elements) {
    if (e !== null) visit(e, fn);
  }
}

function visitObjectExpression(n: Extract<Node, { type: 'ObjectExpression' }>, fn: (n: Node) => void) {
  _visitArray(n.properties, fn);
}

function visitProperty(n: Extract<Node, { type: 'Property' }>, fn: (n: Node) => void) {
  visit(n.key, fn);
  visit(n.value, fn);
}

function visitTemplateLiteral(n: Extract<Node, { type: 'TemplateLiteral' }>, fn: (n: Node) => void) {
  _visitArray(n.quasis, fn);
  _visitArray(n.expressions, fn);
}

function visitTaggedTemplateExpression(n: Extract<Node, { type: 'TaggedTemplateExpression' }>, fn: (n: Node) => void) {
  visit(n.tag, fn);
  _visitOptional(n.typeArguments, fn);
  visit(n.quasi, fn);
}

function visitMemberExpression(n: Extract<Node, { type: 'MemberExpression' }>, fn: (n: Node) => void) {
  visit(n.object, fn);
  visit(n.property, fn);
}

function visitCallExpression(n: Extract<Node, { type: 'CallExpression' }>, fn: (n: Node) => void) {
  visit(n.callee, fn);
  _visitOptional(n.typeArguments, fn);
  _visitArray(n.arguments, fn);
}

function visitNewExpression(n: Extract<Node, { type: 'NewExpression' }>, fn: (n: Node) => void) {
  visit(n.callee, fn);
  _visitOptional(n.typeArguments, fn);
  _visitArray(n.arguments, fn);
}

function visitMetaProperty(n: Extract<Node, { type: 'MetaProperty' }>, fn: (n: Node) => void) {
  visit(n.meta, fn);
  visit(n.property, fn);
}

function visitSpreadElement(n: Extract<Node, { type: 'SpreadElement' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitUpdateExpression(n: Extract<Node, { type: 'UpdateExpression' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitUnaryExpression(n: Extract<Node, { type: 'UnaryExpression' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitBinaryExpression(n: Extract<Node, { type: 'BinaryExpression' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
}

function visitLogicalExpression(n: Extract<Node, { type: 'LogicalExpression' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
}

function visitConditionalExpression(n: Extract<Node, { type: 'ConditionalExpression' }>, fn: (n: Node) => void) {
  visit(n.test, fn);
  visit(n.consequent, fn);
  visit(n.alternate, fn);
}

function visitAssignmentExpression(n: Extract<Node, { type: 'AssignmentExpression' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
}

function visitArrayPattern(n: Extract<Node, { type: 'ArrayPattern' }>, fn: (n: Node) => void) {
  for (const e of n.elements) {
    if (e !== null) visit(e, fn);
  }
}

function visitObjectPattern(n: Extract<Node, { type: 'ObjectPattern' }>, fn: (n: Node) => void) {
  _visitArray(n.properties, fn);
}

function visitRestElement(n: Extract<Node, { type: 'RestElement' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitAssignmentPattern(n: Extract<Node, { type: 'AssignmentPattern' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
}

function visitSequenceExpression(n: Extract<Node, { type: 'SequenceExpression' }>, fn: (n: Node) => void) {
  _visitArray(n.expressions, fn);
}

function visitAwaitExpression(n: Extract<Node, { type: 'AwaitExpression' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitChainExpression(n: Extract<Node, { type: 'ChainExpression' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitParenthesizedExpression(n: Extract<Node, { type: 'ParenthesizedExpression' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitExpressionStatement(n: Extract<Node, { type: 'ExpressionStatement' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitBlockStatement(n: Extract<Node, { type: 'BlockStatement' }>, fn: (n: Node) => void) {
  _visitArray(n.body, fn);
}

function visitVariableDeclaration(n: Extract<Node, { type: 'VariableDeclaration' }>, fn: (n: Node) => void) {
  _visitArray(n.declarations, fn);
}

function visitVariableDeclarator(n: Extract<Node, { type: 'VariableDeclarator' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  _visitOptional(n.init, fn);
}

function visitIfStatement(n: Extract<Node, { type: 'IfStatement' }>, fn: (n: Node) => void) {
  visit(n.test, fn);
  visit(n.consequent, fn);
  _visitOptional(n.alternate, fn);
}

function visitDoWhileStatement(n: Extract<Node, { type: 'DoWhileStatement' }>, fn: (n: Node) => void) {
  visit(n.body, fn);
  visit(n.test, fn);
}

function visitWhileStatement(n: Extract<Node, { type: 'WhileStatement' }>, fn: (n: Node) => void) {
  visit(n.test, fn);
  visit(n.body, fn);
}

function visitForStatement(n: Extract<Node, { type: 'ForStatement' }>, fn: (n: Node) => void) {
  _visitOptional(n.init, fn);
  _visitOptional(n.test, fn);
  _visitOptional(n.update, fn);
  visit(n.body, fn);
}

function visitForInStatement(n: Extract<Node, { type: 'ForInStatement' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
  visit(n.body, fn);
}

function visitForOfStatement(n: Extract<Node, { type: 'ForOfStatement' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
  visit(n.body, fn);
}

function visitContinueStatement(n: Extract<Node, { type: 'ContinueStatement' }>, fn: (n: Node) => void) {
  _visitOptional(n.label, fn);
}

function visitBreakStatement(n: Extract<Node, { type: 'BreakStatement' }>, fn: (n: Node) => void) {
  _visitOptional(n.label, fn);
}

function visitReturnStatement(n: Extract<Node, { type: 'ReturnStatement' }>, fn: (n: Node) => void) {
  _visitOptional(n.argument, fn);
}

function visitWithStatement(n: Extract<Node, { type: 'WithStatement' }>, fn: (n: Node) => void) {
  visit(n.object, fn);
  visit(n.body, fn);
}

function visitSwitchStatement(n: Extract<Node, { type: 'SwitchStatement' }>, fn: (n: Node) => void) {
  visit(n.discriminant, fn);
  _visitArray(n.cases, fn);
}

function visitSwitchCase(n: Extract<Node, { type: 'SwitchCase' }>, fn: (n: Node) => void) {
  _visitOptional(n.test, fn);
  _visitArray(n.consequent, fn);
}

function visitLabeledStatement(n: Extract<Node, { type: 'LabeledStatement' }>, fn: (n: Node) => void) {
  visit(n.label, fn);
  visit(n.body, fn);
}

function visitThrowStatement(n: Extract<Node, { type: 'ThrowStatement' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitTryStatement(n: Extract<Node, { type: 'TryStatement' }>, fn: (n: Node) => void) {
  visit(n.block, fn);
  _visitOptional(n.handler, fn);
  _visitOptional(n.finalizer, fn);
}

function visitCatchClause(n: Extract<Node, { type: 'CatchClause' }>, fn: (n: Node) => void) {
  _visitOptional(n.param, fn);
  visit(n.body, fn);
}

function visitFunction(n: Extract<Node, { type: 'FunctionDeclaration' | 'FunctionExpression' | 'TSDeclareFunction' | 'TSEmptyBodyFunctionExpression' }>, fn: (n: Node) => void) {
  _visitOptional(n.id, fn);
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  _visitOptional(n.returnType, fn);
  _visitOptional(n.body, fn);
}

function visitArrowFunctionExpression(n: Extract<Node, { type: 'ArrowFunctionExpression' }>, fn: (n: Node) => void) {
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  _visitOptional(n.returnType, fn);
  if (n.body) visit(n.body, fn);
}

function visitYieldExpression(n: Extract<Node, { type: 'YieldExpression' }>, fn: (n: Node) => void) {
  _visitOptional(n.argument, fn);
}

function visitClass(n: Extract<Node, { type: 'ClassDeclaration' | 'ClassExpression' }>, fn: (n: Node) => void) {
  _visitArray(n.decorators, fn);
  _visitOptional(n.id, fn);
  _visitOptional(n.typeParameters, fn);
  _visitOptional(n.superClass, fn);
  _visitOptional(n.superTypeArguments, fn);
  _visitArray(n.implements, fn);
  visit(n.body, fn);
}

function visitClassBody(n: Extract<Node, { type: 'ClassBody' }>, fn: (n: Node) => void) {
  _visitArray(n.body, fn);
}

function visitMethodDefinition(n: Extract<Node, { type: 'MethodDefinition' | 'TSAbstractMethodDefinition' }>, fn: (n: Node) => void) {
  _visitArray(n.decorators, fn);
  visit(n.key, fn);
  visit(n.value, fn);
}

function visitPropertyDefinition(n: Extract<Node, { type: 'PropertyDefinition' | 'TSAbstractPropertyDefinition' }>, fn: (n: Node) => void) {
  _visitArray(n.decorators, fn);
  visit(n.key, fn);
  _visitOptional(n.typeAnnotation, fn);
  _visitOptional(n.value, fn);
}

function visitStaticBlock(n: Extract<Node, { type: 'StaticBlock' }>, fn: (n: Node) => void) {
  _visitArray(n.body, fn);
}

function visitAccessorProperty(n: Extract<Node, { type: 'AccessorProperty' | 'TSAbstractAccessorProperty' }>, fn: (n: Node) => void) {
  _visitArray(n.decorators, fn);
  visit(n.key, fn);
  _visitOptional(n.typeAnnotation, fn);
  _visitOptional(n.value, fn);
}

function visitImportExpression(n: Extract<Node, { type: 'ImportExpression' }>, fn: (n: Node) => void) {
  visit(n.source, fn);
  _visitOptional(n.options, fn);
}

function visitImportDeclaration(n: Extract<Node, { type: 'ImportDeclaration' }>, fn: (n: Node) => void) {
  _visitArray(n.specifiers, fn);
  visit(n.source, fn);
  _visitArray(n.attributes, fn);
}

function visitImportSpecifier(n: Extract<Node, { type: 'ImportSpecifier' }>, fn: (n: Node) => void) {
  visit(n.imported, fn);
  visit(n.local, fn);
}

function visitImportDefaultSpecifier(n: Extract<Node, { type: 'ImportDefaultSpecifier' }>, fn: (n: Node) => void) {
  visit(n.local, fn);
}

function visitImportNamespaceSpecifier(n: Extract<Node, { type: 'ImportNamespaceSpecifier' }>, fn: (n: Node) => void) {
  visit(n.local, fn);
}

function visitImportAttribute(n: Extract<Node, { type: 'ImportAttribute' }>, fn: (n: Node) => void) {
  visit(n.key, fn);
  visit(n.value, fn);
}

function visitExportNamedDeclaration(n: Extract<Node, { type: 'ExportNamedDeclaration' }>, fn: (n: Node) => void) {
  _visitOptional(n.declaration, fn);
  _visitArray(n.specifiers, fn);
  _visitOptional(n.source, fn);
  _visitArray(n.attributes, fn);
}

function visitExportDefaultDeclaration(n: Extract<Node, { type: 'ExportDefaultDeclaration' }>, fn: (n: Node) => void) {
  visit(n.declaration, fn);
}

function visitExportAllDeclaration(n: Extract<Node, { type: 'ExportAllDeclaration' }>, fn: (n: Node) => void) {
  _visitOptional(n.exported, fn);
  visit(n.source, fn);
  _visitArray(n.attributes, fn);
}

function visitExportSpecifier(n: Extract<Node, { type: 'ExportSpecifier' }>, fn: (n: Node) => void) {
  visit(n.local, fn);
  visit(n.exported, fn);
}

function visitV8IntrinsicExpression(n: Extract<Node, { type: 'V8IntrinsicExpression' }>, fn: (n: Node) => void) {
  visit(n.name, fn);
  _visitArray(n.arguments, fn);
}

function visitJSXElement(n: Extract<Node, { type: 'JSXElement' }>, fn: (n: Node) => void) {
  visit(n.openingElement, fn);
  _visitArray(n.children, fn);
  _visitOptional(n.closingElement, fn);
}

function visitJSXOpeningElement(n: Extract<Node, { type: 'JSXOpeningElement' }>, fn: (n: Node) => void) {
  visit(n.name, fn);
  _visitOptional(n.typeArguments, fn);
  _visitArray(n.attributes, fn);
}

function visitJSXClosingElement(n: Extract<Node, { type: 'JSXClosingElement' }>, fn: (n: Node) => void) {
  visit(n.name, fn);
}

function visitJSXFragment(n: Extract<Node, { type: 'JSXFragment' }>, fn: (n: Node) => void) {
  visit(n.openingFragment, fn);
  _visitArray(n.children, fn);
  visit(n.closingFragment, fn);
}

function visitJSXNamespacedName(n: Extract<Node, { type: 'JSXNamespacedName' }>, fn: (n: Node) => void) {
  visit(n.namespace, fn);
  visit(n.name, fn);
}

function visitJSXMemberExpression(n: Extract<Node, { type: 'JSXMemberExpression' }>, fn: (n: Node) => void) {
  visit(n.object, fn);
  visit(n.property, fn);
}

function visitJSXExpressionContainer(n: Extract<Node, { type: 'JSXExpressionContainer' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitJSXAttribute(n: Extract<Node, { type: 'JSXAttribute' }>, fn: (n: Node) => void) {
  visit(n.name, fn);
  _visitOptional(n.value, fn);
}

function visitJSXSpreadAttribute(n: Extract<Node, { type: 'JSXSpreadAttribute' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
}

function visitJSXSpreadChild(n: Extract<Node, { type: 'JSXSpreadChild' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitTSEnumDeclaration(n: Extract<Node, { type: 'TSEnumDeclaration' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  visit(n.body, fn);
}

function visitTSEnumBody(n: Extract<Node, { type: 'TSEnumBody' }>, fn: (n: Node) => void) {
  _visitArray(n.members, fn);
}

function visitTSEnumMember(n: Extract<Node, { type: 'TSEnumMember' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  _visitOptional(n.initializer, fn);
}

function visitTSTypeAnnotation(n: Extract<Node, { type: 'TSTypeAnnotation' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSLiteralType(n: Extract<Node, { type: 'TSLiteralType' }>, fn: (n: Node) => void) {
  visit(n.literal, fn);
}

function visitTSConditionalType(n: Extract<Node, { type: 'TSConditionalType' }>, fn: (n: Node) => void) {
  visit(n.checkType, fn);
  visit(n.extendsType, fn);
  visit(n.trueType, fn);
  visit(n.falseType, fn);
}

function visitTSUnionType(n: Extract<Node, { type: 'TSUnionType' }>, fn: (n: Node) => void) {
  _visitArray(n.types, fn);
}

function visitTSIntersectionType(n: Extract<Node, { type: 'TSIntersectionType' }>, fn: (n: Node) => void) {
  _visitArray(n.types, fn);
}

function visitTSParenthesizedType(n: Extract<Node, { type: 'TSParenthesizedType' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSTypeOperator(n: Extract<Node, { type: 'TSTypeOperator' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSArrayType(n: Extract<Node, { type: 'TSArrayType' }>, fn: (n: Node) => void) {
  visit(n.elementType, fn);
}

function visitTSIndexedAccessType(n: Extract<Node, { type: 'TSIndexedAccessType' }>, fn: (n: Node) => void) {
  visit(n.objectType, fn);
  visit(n.indexType, fn);
}

function visitTSTupleType(n: Extract<Node, { type: 'TSTupleType' }>, fn: (n: Node) => void) {
  _visitArray(n.elementTypes, fn);
}

function visitTSNamedTupleMember(n: Extract<Node, { type: 'TSNamedTupleMember' }>, fn: (n: Node) => void) {
  visit(n.label, fn);
  visit(n.elementType, fn);
}

function visitTSOptionalType(n: Extract<Node, { type: 'TSOptionalType' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSRestType(n: Extract<Node, { type: 'TSRestType' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSTypeReference(n: Extract<Node, { type: 'TSTypeReference' }>, fn: (n: Node) => void) {
  visit(n.typeName, fn);
  _visitOptional(n.typeArguments, fn);
}

function visitTSQualifiedName(n: Extract<Node, { type: 'TSQualifiedName' }>, fn: (n: Node) => void) {
  visit(n.left, fn);
  visit(n.right, fn);
}

function visitTSTypeParameterInstantiation(n: Extract<Node, { type: 'TSTypeParameterInstantiation' }>, fn: (n: Node) => void) {
  _visitArray(n.params, fn);
}

function visitTSTypeParameter(n: Extract<Node, { type: 'TSTypeParameter' }>, fn: (n: Node) => void) {
  visit(n.name, fn);
  _visitOptional(n.constraint, fn);
  _visitOptional(n.default, fn);
}

function visitTSTypeParameterDeclaration(n: Extract<Node, { type: 'TSTypeParameterDeclaration' }>, fn: (n: Node) => void) {
  _visitArray(n.params, fn);
}

function visitTSTypeAliasDeclaration(n: Extract<Node, { type: 'TSTypeAliasDeclaration' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  _visitOptional(n.typeParameters, fn);
  visit(n.typeAnnotation, fn);
}

function visitTSClassImplements(n: Extract<Node, { type: 'TSClassImplements' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
  _visitOptional(n.typeArguments, fn);
}

function visitTSInterfaceDeclaration(n: Extract<Node, { type: 'TSInterfaceDeclaration' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.extends, fn);
  visit(n.body, fn);
}

function visitTSInterfaceBody(n: Extract<Node, { type: 'TSInterfaceBody' }>, fn: (n: Node) => void) {
  _visitArray(n.body, fn);
}

function visitTSPropertySignature(n: Extract<Node, { type: 'TSPropertySignature' }>, fn: (n: Node) => void) {
  visit(n.key, fn);
  _visitOptional(n.typeAnnotation, fn);
}

function visitTSIndexSignature(n: Extract<Node, { type: 'TSIndexSignature' }>, fn: (n: Node) => void) {
  _visitArray(n.parameters, fn);
  visit(n.typeAnnotation, fn);
}

function visitTSCallSignatureDeclaration(n: Extract<Node, { type: 'TSCallSignatureDeclaration' }>, fn: (n: Node) => void) {
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  _visitOptional(n.returnType, fn);
}

function visitTSMethodSignature(n: Extract<Node, { type: 'TSMethodSignature' }>, fn: (n: Node) => void) {
  visit(n.key, fn);
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  _visitOptional(n.returnType, fn);
}

function visitTSConstructSignatureDeclaration(n: Extract<Node, { type: 'TSConstructSignatureDeclaration' }>, fn: (n: Node) => void) {
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  _visitOptional(n.returnType, fn);
}

function visitTSInterfaceHeritage(n: Extract<Node, { type: 'TSInterfaceHeritage' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
  _visitOptional(n.typeArguments, fn);
}

function visitTSTypePredicate(n: Extract<Node, { type: 'TSTypePredicate' }>, fn: (n: Node) => void) {
  visit(n.parameterName, fn);
  _visitOptional(n.typeAnnotation, fn);
}

function visitTSModuleDeclaration(n: Extract<Node, { type: 'TSModuleDeclaration' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  _visitOptional(n.body, fn);
}

function visitTSModuleBlock(n: Extract<Node, { type: 'TSModuleBlock' }>, fn: (n: Node) => void) {
  _visitArray(n.body, fn);
}

function visitTSTypeLiteral(n: Extract<Node, { type: 'TSTypeLiteral' }>, fn: (n: Node) => void) {
  _visitArray(n.members, fn);
}

function visitTSInferType(n: Extract<Node, { type: 'TSInferType' }>, fn: (n: Node) => void) {
  visit(n.typeParameter, fn);
}

function visitTSTypeQuery(n: Extract<Node, { type: 'TSTypeQuery' }>, fn: (n: Node) => void) {
  visit(n.exprName, fn);
  _visitOptional(n.typeArguments, fn);
}

function visitTSImportType(n: Extract<Node, { type: 'TSImportType' }>, fn: (n: Node) => void) {
  visit(n.argument, fn);
  _visitOptional(n.options, fn);
  _visitOptional(n.qualifier, fn);
  _visitOptional(n.typeArguments, fn);
}

function visitTSFunctionType(n: Extract<Node, { type: 'TSFunctionType' }>, fn: (n: Node) => void) {
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  visit(n.returnType, fn);
}

function visitTSConstructorType(n: Extract<Node, { type: 'TSConstructorType' }>, fn: (n: Node) => void) {
  _visitOptional(n.typeParameters, fn);
  _visitArray(n.params, fn);
  visit(n.returnType, fn);
}

function visitTSMappedType(n: Extract<Node, { type: 'TSMappedType' }>, fn: (n: Node) => void) {
  visit(n.key, fn);
  _visitOptional(n.constraint, fn);
  _visitOptional(n.nameType, fn);
  _visitOptional(n.typeAnnotation, fn);
}

function visitTSTemplateLiteralType(n: Extract<Node, { type: 'TSTemplateLiteralType' }>, fn: (n: Node) => void) {
  _visitArray(n.quasis, fn);
  _visitArray(n.types, fn);
}

function visitTSAsExpression(n: Extract<Node, { type: 'TSAsExpression' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
  visit(n.typeAnnotation, fn);
}

function visitTSSatisfiesExpression(n: Extract<Node, { type: 'TSSatisfiesExpression' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
  visit(n.typeAnnotation, fn);
}

function visitTSTypeAssertion(n: Extract<Node, { type: 'TSTypeAssertion' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
  visit(n.expression, fn);
}

function visitTSImportEqualsDeclaration(n: Extract<Node, { type: 'TSImportEqualsDeclaration' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
  visit(n.moduleReference, fn);
}

function visitTSExternalModuleReference(n: Extract<Node, { type: 'TSExternalModuleReference' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitTSNonNullExpression(n: Extract<Node, { type: 'TSNonNullExpression' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitDecorator(n: Extract<Node, { type: 'Decorator' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitTSExportAssignment(n: Extract<Node, { type: 'TSExportAssignment' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
}

function visitTSNamespaceExportDeclaration(n: Extract<Node, { type: 'TSNamespaceExportDeclaration' }>, fn: (n: Node) => void) {
  visit(n.id, fn);
}

function visitTSInstantiationExpression(n: Extract<Node, { type: 'TSInstantiationExpression' }>, fn: (n: Node) => void) {
  visit(n.expression, fn);
  visit(n.typeArguments, fn);
}

function visitTSJSDocNullableType(n: Extract<Node, { type: 'TSJSDocNullableType' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSJSDocNonNullableType(n: Extract<Node, { type: 'TSJSDocNonNullableType' }>, fn: (n: Node) => void) {
  visit(n.typeAnnotation, fn);
}

function visitTSParameterProperty(n: Extract<Node, { type: 'TSParameterProperty' }>, fn: (n: Node) => void) {
  _visitArray(n.decorators, fn);
  visit(n.parameter, fn);
}

// Leaf nodes - no children to visit
function visitLeaf(_n: Node, _fn: (n: Node) => void) {
  // No children to visit
}

// Lookup table mapping node types to visitor functions
const visitorLUT: Record<string, (n: any, fn: (n: Node) => void) => void> = {
  'Program': visitProgram,
  'Identifier': visitLeaf,
  'ThisExpression': visitLeaf,
  'Super': visitLeaf,
  'Literal': visitLeaf,
  'EmptyStatement': visitLeaf,
  'DebuggerStatement': visitLeaf,
  'PrivateIdentifier': visitLeaf,
  'Hashbang': visitLeaf,
  'JSXIdentifier': visitLeaf,
  'JSXText': visitLeaf,
  'JSXEmptyExpression': visitLeaf,
  'JSXOpeningFragment': visitLeaf,
  'JSXClosingFragment': visitLeaf,
  'TSAnyKeyword': visitLeaf,
  'TSStringKeyword': visitLeaf,
  'TSBooleanKeyword': visitLeaf,
  'TSNumberKeyword': visitLeaf,
  'TSNeverKeyword': visitLeaf,
  'TSIntrinsicKeyword': visitLeaf,
  'TSUnknownKeyword': visitLeaf,
  'TSNullKeyword': visitLeaf,
  'TSUndefinedKeyword': visitLeaf,
  'TSVoidKeyword': visitLeaf,
  'TSSymbolKeyword': visitLeaf,
  'TSThisType': visitLeaf,
  'TSObjectKeyword': visitLeaf,
  'TSBigIntKeyword': visitLeaf,
  'TSJSDocUnknownType': visitLeaf,
  'TemplateElement': visitLeaf,
  'ArrayExpression': visitArrayExpression,
  'ObjectExpression': visitObjectExpression,
  'Property': visitProperty,
  'TemplateLiteral': visitTemplateLiteral,
  'TaggedTemplateExpression': visitTaggedTemplateExpression,
  'MemberExpression': visitMemberExpression,
  'CallExpression': visitCallExpression,
  'NewExpression': visitNewExpression,
  'MetaProperty': visitMetaProperty,
  'SpreadElement': visitSpreadElement,
  'UpdateExpression': visitUpdateExpression,
  'UnaryExpression': visitUnaryExpression,
  'BinaryExpression': visitBinaryExpression,
  'LogicalExpression': visitLogicalExpression,
  'ConditionalExpression': visitConditionalExpression,
  'AssignmentExpression': visitAssignmentExpression,
  'ArrayPattern': visitArrayPattern,
  'ObjectPattern': visitObjectPattern,
  'RestElement': visitRestElement,
  'AssignmentPattern': visitAssignmentPattern,
  'SequenceExpression': visitSequenceExpression,
  'AwaitExpression': visitAwaitExpression,
  'ChainExpression': visitChainExpression,
  'ParenthesizedExpression': visitParenthesizedExpression,
  'ExpressionStatement': visitExpressionStatement,
  'BlockStatement': visitBlockStatement,
  'VariableDeclaration': visitVariableDeclaration,
  'VariableDeclarator': visitVariableDeclarator,
  'IfStatement': visitIfStatement,
  'DoWhileStatement': visitDoWhileStatement,
  'WhileStatement': visitWhileStatement,
  'ForStatement': visitForStatement,
  'ForInStatement': visitForInStatement,
  'ForOfStatement': visitForOfStatement,
  'ContinueStatement': visitContinueStatement,
  'BreakStatement': visitBreakStatement,
  'ReturnStatement': visitReturnStatement,
  'WithStatement': visitWithStatement,
  'SwitchStatement': visitSwitchStatement,
  'SwitchCase': visitSwitchCase,
  'LabeledStatement': visitLabeledStatement,
  'ThrowStatement': visitThrowStatement,
  'TryStatement': visitTryStatement,
  'CatchClause': visitCatchClause,
  'FunctionDeclaration': visitFunction,
  'FunctionExpression': visitFunction,
  'TSDeclareFunction': visitFunction,
  'TSEmptyBodyFunctionExpression': visitFunction,
  'ArrowFunctionExpression': visitArrowFunctionExpression,
  'YieldExpression': visitYieldExpression,
  'ClassDeclaration': visitClass,
  'ClassExpression': visitClass,
  'ClassBody': visitClassBody,
  'MethodDefinition': visitMethodDefinition,
  'TSAbstractMethodDefinition': visitMethodDefinition,
  'PropertyDefinition': visitPropertyDefinition,
  'TSAbstractPropertyDefinition': visitPropertyDefinition,
  'StaticBlock': visitStaticBlock,
  'AccessorProperty': visitAccessorProperty,
  'TSAbstractAccessorProperty': visitAccessorProperty,
  'ImportExpression': visitImportExpression,
  'ImportDeclaration': visitImportDeclaration,
  'ImportSpecifier': visitImportSpecifier,
  'ImportDefaultSpecifier': visitImportDefaultSpecifier,
  'ImportNamespaceSpecifier': visitImportNamespaceSpecifier,
  'ImportAttribute': visitImportAttribute,
  'ExportNamedDeclaration': visitExportNamedDeclaration,
  'ExportDefaultDeclaration': visitExportDefaultDeclaration,
  'ExportAllDeclaration': visitExportAllDeclaration,
  'ExportSpecifier': visitExportSpecifier,
  'V8IntrinsicExpression': visitV8IntrinsicExpression,
  'JSXElement': visitJSXElement,
  'JSXOpeningElement': visitJSXOpeningElement,
  'JSXClosingElement': visitJSXClosingElement,
  'JSXFragment': visitJSXFragment,
  'JSXNamespacedName': visitJSXNamespacedName,
  'JSXMemberExpression': visitJSXMemberExpression,
  'JSXExpressionContainer': visitJSXExpressionContainer,
  'JSXAttribute': visitJSXAttribute,
  'JSXSpreadAttribute': visitJSXSpreadAttribute,
  'JSXSpreadChild': visitJSXSpreadChild,
  'TSEnumDeclaration': visitTSEnumDeclaration,
  'TSEnumBody': visitTSEnumBody,
  'TSEnumMember': visitTSEnumMember,
  'TSTypeAnnotation': visitTSTypeAnnotation,
  'TSLiteralType': visitTSLiteralType,
  'TSConditionalType': visitTSConditionalType,
  'TSUnionType': visitTSUnionType,
  'TSIntersectionType': visitTSIntersectionType,
  'TSParenthesizedType': visitTSParenthesizedType,
  'TSTypeOperator': visitTSTypeOperator,
  'TSArrayType': visitTSArrayType,
  'TSIndexedAccessType': visitTSIndexedAccessType,
  'TSTupleType': visitTSTupleType,
  'TSNamedTupleMember': visitTSNamedTupleMember,
  'TSOptionalType': visitTSOptionalType,
  'TSRestType': visitTSRestType,
  'TSTypeReference': visitTSTypeReference,
  'TSQualifiedName': visitTSQualifiedName,
  'TSTypeParameterInstantiation': visitTSTypeParameterInstantiation,
  'TSTypeParameter': visitTSTypeParameter,
  'TSTypeParameterDeclaration': visitTSTypeParameterDeclaration,
  'TSTypeAliasDeclaration': visitTSTypeAliasDeclaration,
  'TSClassImplements': visitTSClassImplements,
  'TSInterfaceDeclaration': visitTSInterfaceDeclaration,
  'TSInterfaceBody': visitTSInterfaceBody,
  'TSPropertySignature': visitTSPropertySignature,
  'TSIndexSignature': visitTSIndexSignature,
  'TSCallSignatureDeclaration': visitTSCallSignatureDeclaration,
  'TSMethodSignature': visitTSMethodSignature,
  'TSConstructSignatureDeclaration': visitTSConstructSignatureDeclaration,
  'TSInterfaceHeritage': visitTSInterfaceHeritage,
  'TSTypePredicate': visitTSTypePredicate,
  'TSModuleDeclaration': visitTSModuleDeclaration,
  'TSModuleBlock': visitTSModuleBlock,
  'TSTypeLiteral': visitTSTypeLiteral,
  'TSInferType': visitTSInferType,
  'TSTypeQuery': visitTSTypeQuery,
  'TSImportType': visitTSImportType,
  'TSFunctionType': visitTSFunctionType,
  'TSConstructorType': visitTSConstructorType,
  'TSMappedType': visitTSMappedType,
  'TSTemplateLiteralType': visitTSTemplateLiteralType,
  'TSAsExpression': visitTSAsExpression,
  'TSSatisfiesExpression': visitTSSatisfiesExpression,
  'TSTypeAssertion': visitTSTypeAssertion,
  'TSImportEqualsDeclaration': visitTSImportEqualsDeclaration,
  'TSExternalModuleReference': visitTSExternalModuleReference,
  'TSNonNullExpression': visitTSNonNullExpression,
  'Decorator': visitDecorator,
  'TSExportAssignment': visitTSExportAssignment,
  'TSNamespaceExportDeclaration': visitTSNamespaceExportDeclaration,
  'TSInstantiationExpression': visitTSInstantiationExpression,
  'TSJSDocNullableType': visitTSJSDocNullableType,
  'TSJSDocNonNullableType': visitTSJSDocNonNullableType,
  'TSParameterProperty': visitTSParameterProperty,
};

export function visit(n: Node, fn: (n: Node) => void) {
  // Visit parent first
  fn(n);
  
  // Look up and call the appropriate visitor function
  const visitor = visitorLUT[n.type];
  if (!visitor) {
    throw new Error(`Unhandled node type: ${n.type}`);
  }
  visitor(n, fn);
}


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

export function visit(n: Node, fn: (n: Node) => void) {
  // Visit parent
  fn(n);
  
  // Visit any children
  switch (n.type) {
    case 'Program':
      if (n.hashbang) visit(n.hashbang, fn);
      _visitArray(n.body, fn);
      return;

    // Leaf nodes - no children
    case 'Identifier':
    case 'ThisExpression':
    case 'Super':
    case 'Literal':
    case 'EmptyStatement':
    case 'DebuggerStatement':
    case 'PrivateIdentifier':
    case 'Hashbang':
    case 'JSXIdentifier':
    case 'JSXText':
    case 'JSXEmptyExpression':
    case 'JSXOpeningFragment':
    case 'JSXClosingFragment':
    case 'TSAnyKeyword':
    case 'TSStringKeyword':
    case 'TSBooleanKeyword':
    case 'TSNumberKeyword':
    case 'TSNeverKeyword':
    case 'TSIntrinsicKeyword':
    case 'TSUnknownKeyword':
    case 'TSNullKeyword':
    case 'TSUndefinedKeyword':
    case 'TSVoidKeyword':
    case 'TSSymbolKeyword':
    case 'TSThisType':
    case 'TSObjectKeyword':
    case 'TSBigIntKeyword':
    case 'TSJSDocUnknownType':
      return;

    case 'ArrayExpression':
      for (const e of n.elements) {
        if (e !== null) visit(e, fn);
      }
      return;

    case 'ObjectExpression':
      _visitArray(n.properties, fn);
      return;

    case 'Property':
      visit(n.key, fn);
      visit(n.value, fn);
      return;

    case 'TemplateLiteral':
      _visitArray(n.quasis, fn);
      _visitArray(n.expressions, fn);
      return;

    case 'TaggedTemplateExpression':
      visit(n.tag, fn);
      _visitOptional(n.typeArguments, fn);
      visit(n.quasi, fn);
      return;

    case 'TemplateElement':
      return;

    case 'MemberExpression':
      visit(n.object, fn);
      visit(n.property, fn);
      return;

    case 'CallExpression':
      visit(n.callee, fn);
      _visitOptional(n.typeArguments, fn);
      _visitArray(n.arguments, fn);
      return;

    case 'NewExpression':
      visit(n.callee, fn);
      _visitOptional(n.typeArguments, fn);
      _visitArray(n.arguments, fn);
      return;

    case 'MetaProperty':
      visit(n.meta, fn);
      visit(n.property, fn);
      return;

    case 'SpreadElement':
      visit(n.argument, fn);
      return;

    case 'UpdateExpression':
      visit(n.argument, fn);
      return;

    case 'UnaryExpression':
      visit(n.argument, fn);
      return;

    case 'BinaryExpression':
      visit(n.left, fn);
      visit(n.right, fn);
      return;

    case 'LogicalExpression':
      visit(n.left, fn);
      visit(n.right, fn);
      return;

    case 'ConditionalExpression':
      visit(n.test, fn);
      visit(n.consequent, fn);
      visit(n.alternate, fn);
      return;

    case 'AssignmentExpression':
      visit(n.left, fn);
      visit(n.right, fn);
      return;

    case 'ArrayPattern':
      for (const e of n.elements) {
        if (e !== null) visit(e, fn);
      }
      return;

    case 'ObjectPattern':
      _visitArray(n.properties, fn);
      return;

    case 'RestElement':
      visit(n.argument, fn);
      return;

    case 'AssignmentPattern':
      visit(n.left, fn);
      visit(n.right, fn);
      return;

    case 'SequenceExpression':
      _visitArray(n.expressions, fn);
      return;

    case 'AwaitExpression':
      visit(n.argument, fn);
      return;

    case 'ChainExpression':
      visit(n.expression, fn);
      return;

    case 'ParenthesizedExpression':
      visit(n.expression, fn);
      return;

    case 'ExpressionStatement':
      visit(n.expression, fn);
      return;

    case 'BlockStatement':
      _visitArray(n.body, fn);
      return;

    case 'VariableDeclaration':
      _visitArray(n.declarations, fn);
      return;

    case 'VariableDeclarator':
      visit(n.id, fn);
      _visitOptional(n.init, fn);
      return;

    case 'IfStatement':
      visit(n.test, fn);
      visit(n.consequent, fn);
      _visitOptional(n.alternate, fn);
      return;

    case 'DoWhileStatement':
      visit(n.body, fn);
      visit(n.test, fn);
      return;

    case 'WhileStatement':
      visit(n.test, fn);
      visit(n.body, fn);
      return;

    case 'ForStatement':
      _visitOptional(n.init, fn);
      _visitOptional(n.test, fn);
      _visitOptional(n.update, fn);
      visit(n.body, fn);
      return;

    case 'ForInStatement':
      visit(n.left, fn);
      visit(n.right, fn);
      visit(n.body, fn);
      return;

    case 'ForOfStatement':
      visit(n.left, fn);
      visit(n.right, fn);
      visit(n.body, fn);
      return;

    case 'ContinueStatement':
      _visitOptional(n.label, fn);
      return;

    case 'BreakStatement':
      _visitOptional(n.label, fn);
      return;

    case 'ReturnStatement':
      _visitOptional(n.argument, fn);
      return;

    case 'WithStatement':
      visit(n.object, fn);
      visit(n.body, fn);
      return;

    case 'SwitchStatement':
      visit(n.discriminant, fn);
      _visitArray(n.cases, fn);
      return;

    case 'SwitchCase':
      _visitOptional(n.test, fn);
      _visitArray(n.consequent, fn);
      return;

    case 'LabeledStatement':
      visit(n.label, fn);
      visit(n.body, fn);
      return;

    case 'ThrowStatement':
      visit(n.argument, fn);
      return;

    case 'TryStatement':
      visit(n.block, fn);
      _visitOptional(n.handler, fn);
      _visitOptional(n.finalizer, fn);
      return;

    case 'CatchClause':
      _visitOptional(n.param, fn);
      visit(n.body, fn);
      return;

    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'TSDeclareFunction':
    case 'TSEmptyBodyFunctionExpression':
      _visitOptional(n.id, fn);
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      _visitOptional(n.returnType, fn);
      _visitOptional(n.body, fn);
      return;

    case 'ArrowFunctionExpression':
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      _visitOptional(n.returnType, fn);
      if (n.body) visit(n.body, fn);
      return;

    case 'YieldExpression':
      _visitOptional(n.argument, fn);
      return;

    case 'ClassDeclaration':
    case 'ClassExpression':
      _visitArray(n.decorators, fn);
      _visitOptional(n.id, fn);
      _visitOptional(n.typeParameters, fn);
      _visitOptional(n.superClass, fn);
      _visitOptional(n.superTypeArguments, fn);
      _visitArray(n.implements, fn);
      visit(n.body, fn);
      return;

    case 'ClassBody':
      _visitArray(n.body, fn);
      return;

    case 'MethodDefinition':
    case 'TSAbstractMethodDefinition':
      _visitArray(n.decorators, fn);
      visit(n.key, fn);
      visit(n.value, fn);
      return;

    case 'PropertyDefinition':
    case 'TSAbstractPropertyDefinition':
      _visitArray(n.decorators, fn);
      visit(n.key, fn);
      _visitOptional(n.typeAnnotation, fn);
      _visitOptional(n.value, fn);
      return;

    case 'StaticBlock':
      _visitArray(n.body, fn);
      return;

    case 'AccessorProperty':
    case 'TSAbstractAccessorProperty':
      _visitArray(n.decorators, fn);
      visit(n.key, fn);
      _visitOptional(n.typeAnnotation, fn);
      _visitOptional(n.value, fn);
      return;

    case 'ImportExpression':
      visit(n.source, fn);
      _visitOptional(n.options, fn);
      return;

    case 'ImportDeclaration':
      _visitArray(n.specifiers, fn);
      visit(n.source, fn);
      _visitArray(n.attributes, fn);
      return;

    case 'ImportSpecifier':
      visit(n.imported, fn);
      visit(n.local, fn);
      return;

    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
      visit(n.local, fn);
      return;

    case 'ImportAttribute':
      visit(n.key, fn);
      visit(n.value, fn);
      return;

    case 'ExportNamedDeclaration':
      _visitOptional(n.declaration, fn);
      _visitArray(n.specifiers, fn);
      _visitOptional(n.source, fn);
      _visitArray(n.attributes, fn);
      return;

    case 'ExportDefaultDeclaration':
      visit(n.declaration, fn);
      return;

    case 'ExportAllDeclaration':
      _visitOptional(n.exported, fn);
      visit(n.source, fn);
      _visitArray(n.attributes, fn);
      return;

    case 'ExportSpecifier':
      visit(n.local, fn);
      visit(n.exported, fn);
      return;

    case 'V8IntrinsicExpression':
      visit(n.name, fn);
      _visitArray(n.arguments, fn);
      return;

    case 'JSXElement':
      visit(n.openingElement, fn);
      _visitArray(n.children, fn);
      _visitOptional(n.closingElement, fn);
      return;

    case 'JSXOpeningElement':
      visit(n.name, fn);
      _visitOptional(n.typeArguments, fn);
      _visitArray(n.attributes, fn);
      return;

    case 'JSXClosingElement':
      visit(n.name, fn);
      return;

    case 'JSXFragment':
      visit(n.openingFragment, fn);
      _visitArray(n.children, fn);
      visit(n.closingFragment, fn);
      return;

    case 'JSXNamespacedName':
      visit(n.namespace, fn);
      visit(n.name, fn);
      return;

    case 'JSXMemberExpression':
      visit(n.object, fn);
      visit(n.property, fn);
      return;

    case 'JSXExpressionContainer':
      visit(n.expression, fn);
      return;

    case 'JSXAttribute':
      visit(n.name, fn);
      _visitOptional(n.value, fn);
      return;

    case 'JSXSpreadAttribute':
      visit(n.argument, fn);
      return;

    case 'JSXSpreadChild':
      visit(n.expression, fn);
      return;

    case 'TSEnumDeclaration':
      visit(n.id, fn);
      visit(n.body, fn);
      return;

    case 'TSEnumBody':
      _visitArray(n.members, fn);
      return;

    case 'TSEnumMember':
      visit(n.id, fn);
      _visitOptional(n.initializer, fn);
      return;

    case 'TSTypeAnnotation':
      visit(n.typeAnnotation, fn);
      return;

    case 'TSLiteralType':
      visit(n.literal, fn);
      return;

    case 'TSConditionalType':
      visit(n.checkType, fn);
      visit(n.extendsType, fn);
      visit(n.trueType, fn);
      visit(n.falseType, fn);
      return;

    case 'TSUnionType':
    case 'TSIntersectionType':
      _visitArray(n.types, fn);
      return;

    case 'TSParenthesizedType':
      visit(n.typeAnnotation, fn);
      return;

    case 'TSTypeOperator':
      visit(n.typeAnnotation, fn);
      return;

    case 'TSArrayType':
      visit(n.elementType, fn);
      return;

    case 'TSIndexedAccessType':
      visit(n.objectType, fn);
      visit(n.indexType, fn);
      return;

    case 'TSTupleType':
      _visitArray(n.elementTypes, fn);
      return;

    case 'TSNamedTupleMember':
      visit(n.label, fn);
      visit(n.elementType, fn);
      return;

    case 'TSOptionalType':
    case 'TSRestType':
      visit(n.typeAnnotation, fn);
      return;

    case 'TSTypeReference':
      visit(n.typeName, fn);
      _visitOptional(n.typeArguments, fn);
      return;

    case 'TSQualifiedName':
      visit(n.left, fn);
      visit(n.right, fn);
      return;

    case 'TSTypeParameterInstantiation':
      _visitArray(n.params, fn);
      return;

    case 'TSTypeParameter':
      visit(n.name, fn);
      _visitOptional(n.constraint, fn);
      _visitOptional(n.default, fn);
      return;

    case 'TSTypeParameterDeclaration':
      _visitArray(n.params, fn);
      return;

    case 'TSTypeAliasDeclaration':
      visit(n.id, fn);
      _visitOptional(n.typeParameters, fn);
      visit(n.typeAnnotation, fn);
      return;

    case 'TSClassImplements':
      visit(n.expression, fn);
      _visitOptional(n.typeArguments, fn);
      return;

    case 'TSInterfaceDeclaration':
      visit(n.id, fn);
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.extends, fn);
      visit(n.body, fn);
      return;

    case 'TSInterfaceBody':
      _visitArray(n.body, fn);
      return;

    case 'TSPropertySignature':
      visit(n.key, fn);
      _visitOptional(n.typeAnnotation, fn);
      return;

    case 'TSIndexSignature':
      _visitArray(n.parameters, fn);
      visit(n.typeAnnotation, fn);
      return;

    case 'TSCallSignatureDeclaration':
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      _visitOptional(n.returnType, fn);
      return;

    case 'TSMethodSignature':
      visit(n.key, fn);
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      _visitOptional(n.returnType, fn);
      return;

    case 'TSConstructSignatureDeclaration':
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      _visitOptional(n.returnType, fn);
      return;

    case 'TSInterfaceHeritage':
      visit(n.expression, fn);
      _visitOptional(n.typeArguments, fn);
      return;

    case 'TSTypePredicate':
      visit(n.parameterName, fn);
      _visitOptional(n.typeAnnotation, fn);
      return;

    case 'TSModuleDeclaration':
      visit(n.id, fn);
      _visitOptional(n.body, fn);
      return;

    case 'TSModuleBlock':
      _visitArray(n.body, fn);
      return;

    case 'TSTypeLiteral':
      _visitArray(n.members, fn);
      return;

    case 'TSInferType':
      visit(n.typeParameter, fn);
      return;

    case 'TSTypeQuery':
      visit(n.exprName, fn);
      _visitOptional(n.typeArguments, fn);
      return;

    case 'TSImportType':
      visit(n.argument, fn);
      _visitOptional(n.options, fn);
      _visitOptional(n.qualifier, fn);
      _visitOptional(n.typeArguments, fn);
      return;

    case 'TSFunctionType':
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      visit(n.returnType, fn);
      return;

    case 'TSConstructorType':
      _visitOptional(n.typeParameters, fn);
      _visitArray(n.params, fn);
      visit(n.returnType, fn);
      return;

    case 'TSMappedType':
      visit(n.key, fn);
      _visitOptional(n.constraint, fn);
      _visitOptional(n.nameType, fn);
      _visitOptional(n.typeAnnotation, fn);
      return;

    case 'TSTemplateLiteralType':
      _visitArray(n.quasis, fn);
      _visitArray(n.types, fn);
      return;

    case 'TSAsExpression':
    case 'TSSatisfiesExpression':
      visit(n.expression, fn);
      visit(n.typeAnnotation, fn);
      return;

    case 'TSTypeAssertion':
      visit(n.typeAnnotation, fn);
      visit(n.expression, fn);
      return;

    case 'TSImportEqualsDeclaration':
      visit(n.id, fn);
      visit(n.moduleReference, fn);
      return;

    case 'TSExternalModuleReference':
      visit(n.expression, fn);
      return;

    case 'TSNonNullExpression':
      visit(n.expression, fn);
      return;

    case 'Decorator':
      visit(n.expression, fn);
      return;

    case 'TSExportAssignment':
      visit(n.expression, fn);
      return;

    case 'TSNamespaceExportDeclaration':
      visit(n.id, fn);
      return;

    case 'TSInstantiationExpression':
      visit(n.expression, fn);
      visit(n.typeArguments, fn);
      return;

    case 'TSJSDocNullableType':
    case 'TSJSDocNonNullableType':
      visit(n.typeAnnotation, fn);
      return;

    case 'TSParameterProperty':
      _visitArray(n.decorators, fn);
      visit(n.parameter, fn);
      return;

    default:
      // Exhaustiveness check - will cause TS error if we miss a case
      const _exhaustive: never = n;
      throw new Error(`Unhandled node type: ${(n as any).type}`);
  }
}

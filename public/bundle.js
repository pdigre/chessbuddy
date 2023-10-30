var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toCommonJS = (from) => {
  const moduleCache = __toCommonJS.moduleCache ??= new WeakMap;
  var cached = moduleCache.get(from);
  if (cached)
    return cached;
  var to = __defProp({}, "__esModule", { value: true });
  var desc = { enumerable: false };
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  moduleCache.set(from, to);
  return to;
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? undefined : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator;i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/reflect-metadata/Reflect.js
var exports_Reflect = {};
var Reflect2;
var init_Reflect = __esm(() => {
  /*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  (function(Reflect3) {
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
      var exporter = makeExporter(Reflect3);
      if (typeof root.Reflect === "undefined") {
        root.Reflect = Reflect3;
      } else {
        exporter = makeExporter(root.Reflect, exporter);
      }
      factory(exporter);
      function makeExporter(target, previous) {
        return function(key, value) {
          if (typeof target[key] !== "function") {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
          }
          if (previous)
            previous(key, value);
        };
      }
    })(function(exporter) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = { __proto__: [] } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        create: supportsCreate ? function() {
          return MakeDictionary(Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({ __proto__: null });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map2, key) {
          return hasOwn.call(map2, key);
        } : function(map2, key) {
          return key in map2;
        },
        get: downLevel ? function(map2, key) {
          return hasOwn.call(map2, key) ? map2[key] : undefined;
        } : function(map2, key) {
          return map2[key];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
      var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var Metadata = new _WeakMap;
      function decorate(decorators15, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators15))
            throw new TypeError;
          if (!IsObject(target))
            throw new TypeError;
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError;
          if (IsNull(attributes))
            attributes = undefined;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators15, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators15))
            throw new TypeError;
          if (!IsConstructor(target))
            throw new TypeError;
          return DecorateConstructor(decorators15, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError;
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
            throw new TypeError;
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, false);
        if (IsUndefined(metadataMap))
          return false;
        if (!metadataMap.delete(metadataKey))
          return false;
        if (metadataMap.size > 0)
          return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
          return true;
        Metadata.delete(target);
        return true;
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators15, target) {
        for (var i7 = decorators15.length - 1;i7 >= 0; --i7) {
          var decorator = decorators15[i7];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
              throw new TypeError;
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators15, target, propertyKey, descriptor) {
        for (var i7 = decorators15.length - 1;i7 >= 0; --i7) {
          var decorator = decorators15[i7];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
              throw new TypeError;
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function GetOrCreateMetadataMap(O, P2, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
          if (!Create)
            return;
          targetMetadata = new _Map;
          Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P2);
        if (IsUndefined(metadataMap)) {
          if (!Create)
            return;
          metadataMap = new _Map;
          targetMetadata.set(P2, metadataMap);
        }
        return metadataMap;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P2) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2);
        if (hasOwn2)
          return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryHasMetadata(MetadataKey, parent, P2);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(O, P2, false);
        if (IsUndefined(metadataMap))
          return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P2) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2);
        if (hasOwn2)
          return OrdinaryGetOwnMetadata(MetadataKey, O, P2);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryGetMetadata(MetadataKey, parent, P2);
        return;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(O, P2, false);
        if (IsUndefined(metadataMap))
          return;
        return metadataMap.get(MetadataKey);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(O, P2, true);
        metadataMap.set(MetadataKey, MetadataValue);
      }
      function OrdinaryMetadataKeys(O, P2) {
        var ownKeys3 = OrdinaryOwnMetadataKeys(O, P2);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
          return ownKeys3;
        var parentKeys = OrdinaryMetadataKeys(parent, P2);
        if (parentKeys.length <= 0)
          return ownKeys3;
        if (ownKeys3.length <= 0)
          return parentKeys;
        var set4 = new _Set;
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys3;_i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set4.has(key);
          if (!hasKey) {
            set4.add(key);
            keys.push(key);
          }
        }
        for (var _a2 = 0, parentKeys_1 = parentKeys;_a2 < parentKeys_1.length; _a2++) {
          var key = parentKeys_1[_a2];
          var hasKey = set4.has(key);
          if (!hasKey) {
            set4.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(O, P2) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P2, false);
        if (IsUndefined(metadataMap))
          return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k2 = 0;
        while (true) {
          var next = IteratorStep(iterator);
          if (!next) {
            keys.length = k2;
            return keys;
          }
          var nextValue = IteratorValue(next);
          try {
            keys[k2] = nextValue;
          } catch (e8) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e8;
            }
          }
          k2++;
        }
      }
      function Type(x2) {
        if (x2 === null)
          return 1;
        switch (typeof x2) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x2 === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x2) {
        return x2 === undefined;
      }
      function IsNull(x2) {
        return x2 === null;
      }
      function IsSymbol(x2) {
        return typeof x2 === "symbol";
      }
      function IsObject(x2) {
        return typeof x2 === "object" ? x2 !== null : typeof x2 === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result))
            throw new TypeError;
          return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
      }
      function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result))
              return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
        } else {
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
          var toString_2 = O.toString;
          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result))
              return result;
          }
        }
        throw new TypeError;
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3);
        if (IsSymbol(key))
          return key;
        return ToString(key);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function GetMethod(V2, P2) {
        var func = V2[P2];
        if (func === undefined || func === null)
          return;
        if (!IsCallable(func))
          throw new TypeError;
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
          throw new TypeError;
        var iterator = method.call(obj);
        if (!IsObject(iterator))
          throw new TypeError;
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f2 = iterator["return"];
        if (f2)
          f2.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
          return proto;
        if (proto !== functionPrototype)
          return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
          return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
          return proto;
        if (constructor === O)
          return proto;
        return constructor;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: undefined, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }();
        return function() {
          function Map2() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map2.prototype.has = function(key) {
            return this._find(key, false) >= 0;
          };
          Map2.prototype.get = function(key) {
            var index = this._find(key, false);
            return index >= 0 ? this._values[index] : undefined;
          };
          Map2.prototype.set = function(key, value) {
            var index = this._find(key, true);
            this._values[index] = value;
            return this;
          };
          Map2.prototype.delete = function(key) {
            var index = this._find(key, false);
            if (index >= 0) {
              var size = this._keys.length;
              for (var i7 = index + 1;i7 < size; i7++) {
                this._keys[i7 - 1] = this._keys[i7];
                this._values[i7 - 1] = this._values[i7];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map2.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map2.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map2.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map2.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map2.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map2.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map2.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(undefined);
            }
            return this._cacheIndex;
          };
          return Map2;
        }();
        function getKey(key, _15) {
          return key;
        }
        function getValue(_15, value) {
          return value;
        }
        function getEntry(key, value) {
          return [key, value];
        }
      }
      function CreateSetPolyfill() {
        return function() {
          function Set2() {
            this._map = new _Map;
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set2.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set2.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set2.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set2.prototype.clear = function() {
            this._map.clear();
          };
          Set2.prototype.keys = function() {
            return this._map.keys();
          };
          Set2.prototype.values = function() {
            return this._map.values();
          };
          Set2.prototype.entries = function() {
            return this._map.entries();
          };
          Set2.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set2.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set2;
        }();
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== undefined ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== undefined ? HashMap.get(table, this._key) : undefined;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(target, true);
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== undefined ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }();
        function CreateUniqueKey() {
          var key;
          do
            key = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create)
              return;
            Object.defineProperty(target, rootKey, { value: HashMap.create() });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i7 = 0;i7 < size; ++i7)
            buffer[i7] = Math.random() * 255 | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            if (typeof crypto !== "undefined")
              return crypto.getRandomValues(new Uint8Array(size));
            if (typeof msCrypto !== "undefined")
              return msCrypto.getRandomValues(new Uint8Array(size));
            return FillRandomBytes(new Uint8Array(size), size);
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0;offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8)
              result += "-";
            if (byte < 16)
              result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect2 || (Reflect2 = {}));
});

// node_modules/lit/node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (t.ShadyCSS === undefined || t.ShadyCSS.nativeShadow) && ("adoptedStyleSheets" in Document.prototype) && ("replace" in CSSStyleSheet.prototype);
var s = Symbol();
var n = new WeakMap;

class o {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e && t2 === undefined) {
      const e2 = s2 !== undefined && s2.length === 1;
      e2 && (t2 = n.get(s2)), t2 === undefined && ((this.o = t2 = new CSSStyleSheet).replaceSync(this.cssText), e2 && n.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
}
var r = (t2) => new o(typeof t2 == "string" ? t2 : t2 + "", undefined, s);
var i = (t2, ...e2) => {
  const n2 = t2.length === 1 ? t2[0] : e2.reduce((e3, s2, n3) => e3 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[n3 + 1], t2[0]);
  return new o(n2, t2, s);
};
var S = (s2, n2) => {
  e ? s2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o2 = t.litNonce;
    o2 !== undefined && n3.setAttribute("nonce", o2), n3.textContent = e2.cssText, s2.appendChild(n3);
  });
};
var c = e ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r(e2);
})(t2) : t2;

// node_modules/lit/node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? h : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s3 = t2;
  switch (i2) {
    case Boolean:
      s3 = t2 !== null;
      break;
    case Number:
      s3 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s3 = JSON.parse(t2);
      } catch (t3) {
        s3 = null;
      }
  }
  return s3;
} };
var a = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = "finalized";

class u extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map, this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t2) {
    var i2;
    this.finalize(), ((i2 = this.h) !== null && i2 !== undefined ? i2 : this.h = []).push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s3) => {
      const e3 = this._$Ep(s3, i2);
      e3 !== undefined && (this._$Ev.set(e3, s3), t2.push(e3));
    }), t2;
  }
  static createProperty(t2, i2 = l) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s3 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e3 = this.getPropertyDescriptor(t2, s3, i2);
      e3 !== undefined && Object.defineProperty(this.prototype, t2, e3);
    }
  }
  static getPropertyDescriptor(t2, i2, s3) {
    return { get() {
      return this[i2];
    }, set(e3) {
      const r3 = this[t2];
      this[i2] = e3, this.requestUpdate(t2, r3, s3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l;
  }
  static finalize() {
    if (this.hasOwnProperty(d))
      return false;
    this[d] = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), t2.h !== undefined && (this.h = [...t2.h]), this.elementProperties = new Map(t2.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s3 of i2)
        this.createProperty(s3, t3[s3]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s3 = [];
    if (Array.isArray(i2)) {
      const e3 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e3)
        s3.unshift(c(i3));
    } else
      i2 !== undefined && s3.push(c(i2));
    return s3;
  }
  static _$Ep(t2, i2) {
    const s3 = i2.attribute;
    return s3 === false ? undefined : typeof s3 == "string" ? s3 : typeof t2 == "string" ? t2.toLowerCase() : undefined;
  }
  _$Eu() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = new Map, this._$Eg(), this.requestUpdate(), (t2 = this.constructor.h) === null || t2 === undefined || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s3;
    ((i2 = this._$ES) !== null && i2 !== undefined ? i2 : this._$ES = []).push(t2), this.renderRoot !== undefined && this.isConnected && ((s3 = t2.hostConnected) === null || s3 === undefined || s3.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === undefined || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s3 = (t2 = this.shadowRoot) !== null && t2 !== undefined ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s3, this.constructor.elementStyles), s3;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === undefined && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$ES) === null || t2 === undefined || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === undefined ? undefined : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$ES) === null || t2 === undefined || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === undefined ? undefined : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s3) {
    this._$AK(t2, s3);
  }
  _$EO(t2, i2, s3 = l) {
    var e3;
    const r3 = this.constructor._$Ep(t2, s3);
    if (r3 !== undefined && s3.reflect === true) {
      const h2 = (((e3 = s3.converter) === null || e3 === undefined ? undefined : e3.toAttribute) !== undefined ? s3.converter : n2).toAttribute(i2, s3.type);
      this._$El = t2, h2 == null ? this.removeAttribute(r3) : this.setAttribute(r3, h2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s3;
    const e3 = this.constructor, r3 = e3._$Ev.get(t2);
    if (r3 !== undefined && this._$El !== r3) {
      const t3 = e3.getPropertyOptions(r3), h2 = typeof t3.converter == "function" ? { fromAttribute: t3.converter } : ((s3 = t3.converter) === null || s3 === undefined ? undefined : s3.fromAttribute) !== undefined ? t3.converter : n2;
      this._$El = r3, this[r3] = h2.fromAttribute(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s3) {
    let e3 = true;
    t2 !== undefined && (((s3 = s3 || this.constructor.getPropertyOptions(t2)).hasChanged || a)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s3.reflect === true && this._$El !== t2 && (this._$EC === undefined && (this._$EC = new Map), this._$EC.set(t2, s3))) : e3 = false), !this.isUpdatePending && e3 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = undefined);
    let i2 = false;
    const s3 = this._$AL;
    try {
      i2 = this.shouldUpdate(s3), i2 ? (this.willUpdate(s3), (t2 = this._$ES) === null || t2 === undefined || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === undefined ? undefined : i3.call(t3);
      }), this.update(s3)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s3);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === undefined || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === undefined ? undefined : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = new Map, this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== undefined && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = undefined), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
u[d] = true, u.elementProperties = new Map, u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, o2 == null || o2({ ReactiveElement: u }), ((s2 = e2.reactiveElementVersions) !== null && s2 !== undefined ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

// node_modules/lit/node_modules/lit-html/lit-html.js
var P = function(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return e3 !== undefined ? e3.createHTML(i2) : i2;
};
var S2 = function(t2, i2, s3 = t2, e3) {
  var o3, n3, l2, h2;
  if (i2 === T)
    return i2;
  let r3 = e3 !== undefined ? (o3 = s3._$Co) === null || o3 === undefined ? undefined : o3[e3] : s3._$Cl;
  const u2 = d2(i2) ? undefined : i2._$litDirective$;
  return (r3 == null ? undefined : r3.constructor) !== u2 && ((n3 = r3 == null ? undefined : r3._$AO) === null || n3 === undefined || n3.call(r3, false), u2 === undefined ? r3 = undefined : (r3 = new u2(t2), r3._$AT(t2, s3, e3)), e3 !== undefined ? ((l2 = (h2 = s3)._$Co) !== null && l2 !== undefined ? l2 : h2._$Co = [])[e3] = r3 : s3._$Cl = r3), r3 !== undefined && (i2 = S2(t2, r3._$AS(t2, i2.values), r3, e3)), i2;
};
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : undefined;
var o3 = "$lit$";
var n3 = `lit\$${(Math.random() + "").slice(9)}\$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var u2 = () => r3.createComment("");
var d2 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var c2 = Array.isArray;
var v = (t3) => c2(t3) || typeof (t3 == null ? undefined : t3[Symbol.iterator]) == "function";
var a2 = "[ \t\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|\$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t3) => (i3, ...s4) => ({ _$litType$: t3, strings: i3, values: s4 });
var x = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = new WeakMap;
var C = r3.createTreeWalker(r3, 129, null, false);
var V = (t3, i3) => {
  const s4 = t3.length - 1, e4 = [];
  let l3, r4 = i3 === 2 ? "<svg>" : "", u3 = f;
  for (let i4 = 0;i4 < s4; i4++) {
    const s5 = t3[i4];
    let d3, c3, v2 = -1, a3 = 0;
    for (;a3 < s5.length && (u3.lastIndex = a3, c3 = u3.exec(s5), c3 !== null); )
      a3 = u3.lastIndex, u3 === f ? c3[1] === "!--" ? u3 = _ : c3[1] !== undefined ? u3 = m : c3[2] !== undefined ? (y.test(c3[2]) && (l3 = RegExp("</" + c3[2], "g")), u3 = p) : c3[3] !== undefined && (u3 = p) : u3 === p ? c3[0] === ">" ? (u3 = l3 != null ? l3 : f, v2 = -1) : c3[1] === undefined ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = c3[3] === undefined ? p : c3[3] === '"' ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l3 = undefined);
    const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += u3 === f ? s5 + h2 : v2 >= 0 ? (e4.push(d3), s5.slice(0, v2) + o3 + s5.slice(v2) + n3 + w2) : s5 + n3 + (v2 === -2 ? (e4.push(undefined), i4) : w2);
  }
  return [P(t3, r4 + (t3[s4] || "<?>") + (i3 === 2 ? "</svg>" : "")), e4];
};

class N {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let h3;
    this.parts = [];
    let r4 = 0, d3 = 0;
    const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i3);
    if (this.el = N.createElement(a3, e4), C.currentNode = this.el.content, i3 === 2) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (;(h3 = C.nextNode()) !== null && v2.length < c3; ) {
      if (h3.nodeType === 1) {
        if (h3.hasAttributes()) {
          const t4 = [];
          for (const i4 of h3.getAttributeNames())
            if (i4.endsWith(o3) || i4.startsWith(n3)) {
              const s4 = f2[d3++];
              if (t4.push(i4), s4 !== undefined) {
                const t5 = h3.getAttribute(s4.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s4);
                v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: i5[1] === "." ? H : i5[1] === "?" ? L : i5[1] === "@" ? z : k });
              } else
                v2.push({ type: 6, index: r4 });
            }
          for (const i4 of t4)
            h3.removeAttribute(i4);
        }
        if (y.test(h3.tagName)) {
          const t4 = h3.textContent.split(n3), i4 = t4.length - 1;
          if (i4 > 0) {
            h3.textContent = s3 ? s3.emptyScript : "";
            for (let s4 = 0;s4 < i4; s4++)
              h3.append(t4[s4], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
            h3.append(t4[i4], u2());
          }
        }
      } else if (h3.nodeType === 8)
        if (h3.data === l2)
          v2.push({ type: 2, index: r4 });
        else {
          let t4 = -1;
          for (;(t4 = h3.data.indexOf(n3, t4 + 1)) !== -1; )
            v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t3, i3) {
    const s4 = r3.createElement("template");
    return s4.innerHTML = t3, s4;
  }
}

class M {
  constructor(t3, i3) {
    this._$AV = [], this._$AN = undefined, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    var i3;
    const { el: { content: s4 }, parts: e4 } = this._$AD, o4 = ((i3 = t3 == null ? undefined : t3.creationScope) !== null && i3 !== undefined ? i3 : r3).importNode(s4, true);
    C.currentNode = o4;
    let n4 = C.nextNode(), l3 = 0, h3 = 0, u3 = e4[0];
    for (;u3 !== undefined; ) {
      if (l3 === u3.index) {
        let i4;
        u3.type === 2 ? i4 = new R(n4, n4.nextSibling, this, t3) : u3.type === 1 ? i4 = new u3.ctor(n4, u3.name, u3.strings, this, t3) : u3.type === 6 && (i4 = new Z(n4, this, t3)), this._$AV.push(i4), u3 = e4[++h3];
      }
      l3 !== (u3 == null ? undefined : u3.index) && (n4 = C.nextNode(), l3++);
    }
    return C.currentNode = r3, o4;
  }
  v(t3) {
    let i3 = 0;
    for (const s4 of this._$AV)
      s4 !== undefined && (s4.strings !== undefined ? (s4._$AI(t3, s4, i3), i3 += s4.strings.length - 2) : s4._$AI(t3[i3])), i3++;
  }
}

class R {
  constructor(t3, i3, s4, e4) {
    var o4;
    this.type = 2, this._$AH = A, this._$AN = undefined, this._$AA = t3, this._$AB = i3, this._$AM = s4, this.options = e4, this._$Cp = (o4 = e4 == null ? undefined : e4.isConnected) === null || o4 === undefined || o4;
  }
  get _$AU() {
    var t3, i3;
    return (i3 = (t3 = this._$AM) === null || t3 === undefined ? undefined : t3._$AU) !== null && i3 !== undefined ? i3 : this._$Cp;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return i3 !== undefined && (t3 == null ? undefined : t3.nodeType) === 11 && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = S2(this, t3, i3), d2(t3) ? t3 === A || t3 == null || t3 === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : t3._$litType$ !== undefined ? this.g(t3) : t3.nodeType !== undefined ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
  }
  k(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  $(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
  }
  _(t3) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
  }
  g(t3) {
    var i3;
    const { values: s4, _$litType$: e4 } = t3, o4 = typeof e4 == "number" ? this._$AC(t3) : (e4.el === undefined && (e4.el = N.createElement(P(e4.h, e4.h[0]), this.options)), e4);
    if (((i3 = this._$AH) === null || i3 === undefined ? undefined : i3._$AD) === o4)
      this._$AH.v(s4);
    else {
      const t4 = new M(o4, this), i4 = t4.u(this.options);
      t4.v(s4), this.$(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = E.get(t3.strings);
    return i3 === undefined && E.set(t3.strings, i3 = new N(t3)), i3;
  }
  T(t3) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s4, e4 = 0;
    for (const o4 of t3)
      e4 === i3.length ? i3.push(s4 = new R(this.k(u2()), this.k(u2()), this, this.options)) : s4 = i3[e4], s4._$AI(o4), e4++;
    e4 < i3.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s4;
    for ((s4 = this._$AP) === null || s4 === undefined || s4.call(this, false, true, i3);t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    this._$AM === undefined && (this._$Cp = t3, (i3 = this._$AP) === null || i3 === undefined || i3.call(this, t3));
  }
}

class k {
  constructor(t3, i3, s4, e4, o4) {
    this.type = 1, this._$AH = A, this._$AN = undefined, this.element = t3, this.name = i3, this._$AM = e4, this.options = o4, s4.length > 2 || s4[0] !== "" || s4[1] !== "" ? (this._$AH = Array(s4.length - 1).fill(new String), this.strings = s4) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s4, e4) {
    const o4 = this.strings;
    let n4 = false;
    if (o4 === undefined)
      t3 = S2(this, t3, i3, 0), n4 = !d2(t3) || t3 !== this._$AH && t3 !== T, n4 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l3, h3;
      for (t3 = o4[0], l3 = 0;l3 < o4.length - 1; l3++)
        h3 = S2(this, e5[s4 + l3], i3, l3), h3 === T && (h3 = this._$AH[l3]), n4 || (n4 = !d2(h3) || h3 !== this._$AH[l3]), h3 === A ? t3 = A : t3 !== A && (t3 += (h3 != null ? h3 : "") + o4[l3 + 1]), this._$AH[l3] = h3;
    }
    n4 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}

class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? undefined : t3;
  }
}
var I = s3 ? s3.emptyScript : "";

class L extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
}

class z extends k {
  constructor(t3, i3, s4, e4, o4) {
    super(t3, i3, s4, e4, o4), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s4;
    if ((t3 = (s4 = S2(this, t3, i3, 0)) !== null && s4 !== undefined ? s4 : A) === T)
      return;
    const e4 = this._$AH, o4 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n4 = t3 !== A && (e4 === A || o4);
    o4 && this.element.removeEventListener(this.name, this, e4), n4 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s4;
    typeof this._$AH == "function" ? this._$AH.call((s4 = (i3 = this.options) === null || i3 === undefined ? undefined : i3.host) !== null && s4 !== undefined ? s4 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}

class Z {
  constructor(t3, i3, s4) {
    this.element = t3, this.type = 6, this._$AN = undefined, this._$AM = i3, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    S2(this, t3);
  }
}
var B = i2.litHtmlPolyfillSupport;
B == null || B(N, R), ((t2 = i2.litHtmlVersions) !== null && t2 !== undefined ? t2 : i2.litHtmlVersions = []).push("2.8.0");
var D = (t3, i3, s4) => {
  var e4, o4;
  const n4 = (e4 = s4 == null ? undefined : s4.renderBefore) !== null && e4 !== undefined ? e4 : i3;
  let l3 = n4._$litPart$;
  if (l3 === undefined) {
    const t4 = (o4 = s4 == null ? undefined : s4.renderBefore) !== null && o4 !== undefined ? o4 : null;
    n4._$litPart$ = l3 = new R(i3.insertBefore(u2(), t4), t4, undefined, s4 != null ? s4 : {});
  }
  return l3._$AI(t3), l3;
};
// node_modules/lit/node_modules/lit-element/lit-element.js
var l3;
var o4;
class s4 extends u {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = undefined;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== undefined || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Do) === null || t3 === undefined || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Do) === null || t3 === undefined || t3.setConnected(false);
  }
  render() {
    return T;
  }
}
s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === undefined || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
n4 == null || n4({ LitElement: s4 });
((o4 = globalThis.litElementVersions) !== null && o4 !== undefined ? o4 : globalThis.litElementVersions = []).push("3.3.3");
// node_modules/lit/node_modules/lit-html/is-server.js
var o5 = false;
// node_modules/lit/node_modules/@lit/reactive-element/decorators/custom-element.js
var e4 = (e5) => (n5) => typeof n5 == "function" ? ((e6, n6) => (customElements.define(e6, n6), n6))(e5, n5) : ((e6, n6) => {
  const { kind: t3, elements: s5 } = n6;
  return { kind: t3, elements: s5, finisher(n7) {
    customElements.define(e6, n7);
  } };
})(e5, n5);
// node_modules/lit/node_modules/@lit/reactive-element/decorators/property.js
var n5 = function(n6) {
  return (t3, o6) => o6 !== undefined ? e5(n6, t3, o6) : i3(n6, t3);
};
var i3 = (i4, e5) => e5.kind === "method" && e5.descriptor && !("value" in e5.descriptor) ? { ...e5, finisher(n6) {
  n6.createProperty(e5.key, i4);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  typeof e5.initializer == "function" && (this[e5.key] = e5.initializer.call(this));
}, finisher(n6) {
  n6.createProperty(e5.key, i4);
} };
var e5 = (i4, e6, n6) => {
  e6.constructor.createProperty(n6, i4);
};
// node_modules/lit/node_modules/@lit/reactive-element/decorators/state.js
var t3 = function(t4) {
  return n5({ ...t4, state: true });
};
// node_modules/lit/node_modules/@lit/reactive-element/decorators/base.js
var o6 = ({ finisher: e6, descriptor: t4 }) => (o7, n6) => {
  var r4;
  if (n6 === undefined) {
    const n7 = (r4 = o7.originalKey) !== null && r4 !== undefined ? r4 : o7.key, i4 = t4 != null ? { kind: "method", placement: "prototype", key: n7, descriptor: t4(o7.key) } : { ...o7, key: n7 };
    return e6 != null && (i4.finisher = function(t5) {
      e6(t5, n7);
    }), i4;
  }
  {
    const r5 = o7.constructor;
    t4 !== undefined && Object.defineProperty(o7, n6, t4(n6)), e6 == null || e6(r5, n6);
  }
};
// node_modules/lit/node_modules/@lit/reactive-element/decorators/query.js
var i4 = function(i5, n6) {
  return o6({ descriptor: (o7) => {
    const t4 = { get() {
      var o8, n7;
      return (n7 = (o8 = this.renderRoot) === null || o8 === undefined ? undefined : o8.querySelector(i5)) !== null && n7 !== undefined ? n7 : null;
    }, enumerable: true, configurable: true };
    if (n6) {
      const n7 = typeof o7 == "symbol" ? Symbol() : "__" + o7;
      t4.get = function() {
        var o8, t5;
        return this[n7] === undefined && (this[n7] = (t5 = (o8 = this.renderRoot) === null || o8 === undefined ? undefined : o8.querySelector(i5)) !== null && t5 !== undefined ? t5 : null), this[n7];
      };
    }
    return t4;
  } });
};
// node_modules/lit/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var l4 = function(n6) {
  const { slot: l5, selector: t4 } = n6 != null ? n6 : {};
  return o6({ descriptor: (o7) => ({ get() {
    var o8;
    const r4 = "slot" + (l5 ? `[name=${l5}]` : ":not([name])"), i5 = (o8 = this.renderRoot) === null || o8 === undefined ? undefined : o8.querySelector(r4), s5 = i5 != null ? e6(i5, n6) : [];
    return t4 ? s5.filter((o9) => o9.matches(t4)) : s5;
  }, enumerable: true, configurable: true }) });
};
var n6;
var e6 = ((n6 = window.HTMLSlotElement) === null || n6 === undefined ? undefined : n6.prototype.assignedElements) != null ? (o7, n7) => o7.assignedElements(n7) : (o7, n7) => o7.assignedNodes(n7).filter((o8) => o8.nodeType === Node.ELEMENT_NODE);
// node_modules/lit/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var o7 = function(o8, n7, r4) {
  let l5, s5 = o8;
  return typeof o8 == "object" ? (s5 = o8.slot, l5 = o8) : l5 = { flatten: n7 }, r4 ? l4({ slot: s5, flatten: n7, selector: r4 }) : o6({ descriptor: (e7) => ({ get() {
    var e8, t4;
    const o9 = "slot" + (s5 ? `[name=${s5}]` : ":not([name])"), n8 = (e8 = this.renderRoot) === null || e8 === undefined ? undefined : e8.querySelector(o9);
    return (t4 = n8 == null ? undefined : n8.assignedNodes(l5)) !== null && t4 !== undefined ? t4 : [];
  }, enumerable: true, configurable: true }) });
};
// node_modules/lit/node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t5) => (...e8) => ({ _$litDirective$: t5, values: e8 });

class i5 {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e8, i6) {
    this._$Ct = t5, this._$AM = e8, this._$Ci = i6;
  }
  _$AS(t5, e8) {
    return this.update(t5, e8);
  }
  update(t5, e8) {
    return this.render(...e8);
  }
}
// node_modules/lit/node_modules/lit-html/directives/style-map.js
var i6 = "important";
var n7 = " !" + i6;
var o8 = e7(class extends i5 {
  constructor(t5) {
    var e8;
    if (super(t5), t5.type !== t4.ATTRIBUTE || t5.name !== "style" || ((e8 = t5.strings) === null || e8 === undefined ? undefined : e8.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return Object.keys(t5).reduce((e8, r4) => {
      const s5 = t5[r4];
      return s5 == null ? e8 : e8 + `${r4 = r4.includes("-") ? r4 : r4.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s5};`;
    }, "");
  }
  update(e8, [r4]) {
    const { style: s5 } = e8.element;
    if (this.ht === undefined) {
      this.ht = new Set;
      for (const t5 in r4)
        this.ht.add(t5);
      return this.render(r4);
    }
    this.ht.forEach((t5) => {
      r4[t5] == null && (this.ht.delete(t5), t5.includes("-") ? s5.removeProperty(t5) : s5[t5] = "");
    });
    for (const t5 in r4) {
      const e9 = r4[t5];
      if (e9 != null) {
        this.ht.add(t5);
        const r5 = typeof e9 == "string" && e9.endsWith(n7);
        t5.includes("-") || r5 ? s5.setProperty(t5, r5 ? e9.slice(0, -11) : e9, r5 ? i6 : "") : s5[t5] = e9;
      }
    }
    return T;
  }
});
// node_modules/lit/node_modules/lit-html/directives/if-defined.js
var l5 = (l6) => l6 != null ? l6 : A;
// node_modules/chessboard-element/lib/utils.js
var RUN_ASSERTS = true;
var isString = (s5) => {
  return typeof s5 === "string";
};
var isFunction = (f2) => {
  return typeof f2 === "function";
};
var deepCopy = (thing) => {
  return JSON.parse(JSON.stringify(thing));
};
var interpolateTemplate = (str, obj) => {
  for (const [key, value] of Object.entries(obj)) {
    const keyTemplateStr = "{" + key + "}";
    while (str.includes(keyTemplateStr)) {
      str = str.replace(keyTemplateStr, value);
    }
  }
  return str;
};
if (RUN_ASSERTS) {
  console.assert(interpolateTemplate("abc", { a: "x" }) === "abc");
  console.assert(interpolateTemplate("{a}bc", {}) === "{a}bc");
  console.assert(interpolateTemplate("{a}bc", { p: "q" }) === "{a}bc");
  console.assert(interpolateTemplate("{a}bc", { a: "x" }) === "xbc");
  console.assert(interpolateTemplate("{a}bc{a}bc", { a: "x" }) === "xbcxbc");
  console.assert(interpolateTemplate("{a}{a}{b}", { a: "x", b: "y" }) === "xxy");
}

// node_modules/chessboard-element/lib/chessboard-styles.js
var styles = i`
  :host {
    display: block;
    position: relative;
    --light-color: #f0d9b5;
    --dark-color: #b58863;
    --highlight-color: yellow;
  }

  [part~='board'] {
    border: 2px solid #404040;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(8, 12.5%);
  }

  [part~='square'] {
    position: relative;

    /* disable any native browser highlighting */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  [part~='piece'],
  .piece-image {
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  [part~='spare-pieces'] {
    display: grid;
    position: relative;
    padding: 0 2px;
    grid-template-columns: repeat(8, 12.5%);
  }

  [part~='dragged-piece'] {
    display: none;
    position: absolute;
  }

  [part~='white'] {
    background-color: var(--light-color);
    color: var(--dark-color);
  }

  [part~='black'] {
    background-color: var(--dark-color);
    color: var(--light-color);
  }

  [part~='highlight'] {
    box-shadow: inset 0 0 3px 3px var(--highlight-color);
  }

  [part~='notation'] {
    cursor: default;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    position: absolute;
  }

  [part~='alpha'] {
    bottom: 1px;
    right: 3px;
  }

  [part~='numeric'] {
    top: 2px;
    left: 2px;
  }
`;

// node_modules/chessboard-element/lib/chess-utils.js
var RUN_ASSERTS2 = true;
var START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var COLUMNS = "abcdefgh".split("");
var whitePieces = ["wK", "wQ", "wR", "wB", "wN", "wP"];
var blackPieces = ["bK", "bQ", "bR", "bB", "bN", "bP"];
var getSquareColor = (square) => square.charCodeAt(0) % 2 ^ square.charCodeAt(1) % 2 ? "white" : "black";
var validSquare = (square) => {
  return isString(square) && square.search(/^[a-h][1-8]$/) !== -1;
};
var validMove = (move) => {
  if (!isString(move))
    return false;
  const squares = move.split("-");
  if (squares.length !== 2)
    return false;
  return validSquare(squares[0]) && validSquare(squares[1]);
};
if (RUN_ASSERTS2) {
  console.assert(validSquare("a1"));
  console.assert(validSquare("e2"));
  console.assert(!validSquare("D2"));
  console.assert(!validSquare("g9"));
  console.assert(!validSquare("a"));
  console.assert(!validSquare(true));
  console.assert(!validSquare(null));
  console.assert(!validSquare({}));
}
var validPieceCode = (code) => {
  return isString(code) && code.search(/^[bw][KQRNBP]$/) !== -1;
};
if (RUN_ASSERTS2) {
  console.assert(validPieceCode("bP"));
  console.assert(validPieceCode("bK"));
  console.assert(validPieceCode("wK"));
  console.assert(validPieceCode("wR"));
  console.assert(!validPieceCode("WR"));
  console.assert(!validPieceCode("Wr"));
  console.assert(!validPieceCode("a"));
  console.assert(!validPieceCode(true));
  console.assert(!validPieceCode(null));
  console.assert(!validPieceCode({}));
}
var squeezeFenEmptySquares = (fen) => {
  return fen.replace(/11111111/g, "8").replace(/1111111/g, "7").replace(/111111/g, "6").replace(/11111/g, "5").replace(/1111/g, "4").replace(/111/g, "3").replace(/11/g, "2");
};
var expandFenEmptySquares = (fen) => {
  return fen.replace(/8/g, "11111111").replace(/7/g, "1111111").replace(/6/g, "111111").replace(/5/g, "11111").replace(/4/g, "1111").replace(/3/g, "111").replace(/2/g, "11");
};
var validFen = (fen) => {
  if (!isString(fen))
    return false;
  fen = fen.replace(/ .+$/, "");
  fen = expandFenEmptySquares(fen);
  const chunks = fen.split("/");
  if (chunks.length !== 8)
    return false;
  for (let i7 = 0;i7 < 8; i7++) {
    if (chunks[i7].length !== 8 || chunks[i7].search(/[^kqrnbpKQRNBP1]/) !== -1) {
      return false;
    }
  }
  return true;
};
if (RUN_ASSERTS2) {
  console.assert(validFen(START_FEN));
  console.assert(validFen("8/8/8/8/8/8/8/8"));
  console.assert(validFen("r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R"));
  console.assert(validFen("3r3r/1p4pp/2nb1k2/pP3p2/8/PB2PN2/p4PPP/R4RK1 b - - 0 1"));
  console.assert(!validFen("3r3z/1p4pp/2nb1k2/pP3p2/8/PB2PN2/p4PPP/R4RK1 b - - 0 1"));
  console.assert(!validFen("anbqkbnr/8/8/8/8/8/PPPPPPPP/8"));
  console.assert(!validFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/"));
  console.assert(!validFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN"));
  console.assert(!validFen("888888/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"));
  console.assert(!validFen("888888/pppppppp/74/8/8/8/PPPPPPPP/RNBQKBNR"));
  console.assert(!validFen({}));
}
var validPositionObject = (pos) => {
  if (typeof pos !== "object" || pos === null) {
    return false;
  }
  for (const [square, piece] of Object.entries(pos)) {
    if (!validSquare(square) || !validPieceCode(piece)) {
      return false;
    }
  }
  return true;
};
if (RUN_ASSERTS2) {
  console.assert(validPositionObject({}));
  console.assert(validPositionObject({ e2: "wP" }));
  console.assert(validPositionObject({ e2: "wP", d2: "wP" }));
  console.assert(!validPositionObject({ e2: "BP" }));
  console.assert(!validPositionObject({ y2: "wP" }));
  console.assert(!validPositionObject(null));
  console.assert(!validPositionObject(undefined));
  console.assert(!validPositionObject(1));
  console.assert(!validPositionObject("start"));
  console.assert(!validPositionObject(START_FEN));
}
var fenToPieceCode = (piece) => {
  if (piece.toLowerCase() === piece) {
    return "b" + piece.toUpperCase();
  }
  return "w" + piece.toUpperCase();
};
var pieceCodeToFen = (piece) => {
  const pieceCodeLetters = piece.split("");
  if (pieceCodeLetters[0] === "w") {
    return pieceCodeLetters[1].toUpperCase();
  }
  return pieceCodeLetters[1].toLowerCase();
};
var fenToObj = (fen) => {
  if (!validFen(fen))
    return false;
  fen = fen.replace(/ .+$/, "");
  const rows = fen.split("/");
  const position = {};
  let currentRow = 8;
  for (let i7 = 0;i7 < 8; i7++) {
    const row = rows[i7].split("");
    let colIdx = 0;
    for (let j = 0;j < row.length; j++) {
      if (row[j].search(/[1-8]/) !== -1) {
        const numEmptySquares = parseInt(row[j], 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        const square = COLUMNS[colIdx] + currentRow;
        position[square] = fenToPieceCode(row[j]);
        colIdx = colIdx + 1;
      }
    }
    currentRow = currentRow - 1;
  }
  return position;
};
var START_POSITION = fenToObj(START_FEN);
var objToFen = (obj) => {
  if (!validPositionObject(obj))
    return false;
  let fen = "";
  let currentRow = 8;
  for (let i7 = 0;i7 < 8; i7++) {
    for (let j = 0;j < 8; j++) {
      const square = COLUMNS[j] + currentRow;
      if (obj.hasOwnProperty(square)) {
        fen = fen + pieceCodeToFen(obj[square]);
      } else {
        fen = fen + "1";
      }
    }
    if (i7 !== 7) {
      fen = fen + "/";
    }
    currentRow = currentRow - 1;
  }
  fen = squeezeFenEmptySquares(fen);
  return fen;
};
if (RUN_ASSERTS2) {
  console.assert(objToFen(START_POSITION) === START_FEN);
  console.assert(objToFen({}) === "8/8/8/8/8/8/8/8");
  console.assert(objToFen({ a2: "wP", b2: "bP" }) === "8/8/8/8/8/8/Pp6/8");
}
var normalizePozition = (position) => {
  if (position == null) {
    return {};
  }
  if (isString(position) && position.toLowerCase() === "start") {
    position = deepCopy(START_POSITION);
  }
  if (validFen(position)) {
    position = fenToObj(position);
  }
  return position;
};
var squareDistance = (squareA, squareB) => {
  const squareAArray = squareA.split("");
  const squareAx = COLUMNS.indexOf(squareAArray[0]) + 1;
  const squareAy = parseInt(squareAArray[1], 10);
  const squareBArray = squareB.split("");
  const squareBx = COLUMNS.indexOf(squareBArray[0]) + 1;
  const squareBy = parseInt(squareBArray[1], 10);
  const xDelta = Math.abs(squareAx - squareBx);
  const yDelta = Math.abs(squareAy - squareBy);
  if (xDelta >= yDelta)
    return xDelta;
  return yDelta;
};
var createRadius = (square) => {
  const squares = [];
  for (let i7 = 0;i7 < 8; i7++) {
    for (let j = 0;j < 8; j++) {
      const s5 = COLUMNS[i7] + (j + 1);
      if (square === s5)
        continue;
      squares.push({
        square: s5,
        distance: squareDistance(square, s5)
      });
    }
  }
  squares.sort(function(a3, b2) {
    return a3.distance - b2.distance;
  });
  const surroundingSquares = [];
  for (let i7 = 0;i7 < squares.length; i7++) {
    surroundingSquares.push(squares[i7].square);
  }
  return surroundingSquares;
};
var findClosestPiece = (position, piece, square) => {
  const closestSquares = createRadius(square);
  for (let i7 = 0;i7 < closestSquares.length; i7++) {
    const s5 = closestSquares[i7];
    if (position.hasOwnProperty(s5) && position[s5] === piece) {
      return s5;
    }
  }
  return false;
};
var calculatePositionFromMoves = (position, moves) => {
  const newPosition = deepCopy(position);
  for (const i7 in moves) {
    if (!moves.hasOwnProperty(i7))
      continue;
    if (!newPosition.hasOwnProperty(i7))
      continue;
    const piece = newPosition[i7];
    delete newPosition[i7];
    newPosition[moves[i7]] = piece;
  }
  return newPosition;
};

// node_modules/chessboard-element/lib/wikipedia-pieces-svg.js
var renderPiece = (piece, container) => {
  D(x` <svg class="piece-image" viewBox="0 0 45 45">${pieces[piece]}</svg> `, container);
};
var pieces = {
  bB: b`
    <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;"> 
        <path
          d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
        <path
          d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <path
          d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style="fill:none; stroke:#ffffff; stroke-linejoin:miter;" />
    </g>
  `,
  wB: b`
    <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;"> 
        <path
          d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
        <path
          d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <path
          d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
    </g>
  `,
  bK: b`
    <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22.5,11.63 L 22.5,6"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
        id="path6570" />
      <path
        d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
        style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;" />
      <path
        d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 20,8 L 25,8"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
      <path
        d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
        style="fill:none; stroke:#ffffff;" />
    </g>
  `,
  wK: b`
    <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22.5,11.63 L 22.5,6"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
      <path
        d="M 20,8 L 25,8"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
      <path
        d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
        style="fill:#ffffff; stroke:#000000; stroke-linecap:butt; stroke-linejoin:miter;" />
      <path
        d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
        style="fill:#ffffff; stroke:#000000;" />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30"
        style="fill:none; stroke:#000000;" />
      <path
        d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"
        style="fill:none; stroke:#000000;" />
      <path
        d="M 11.5,37 C 17,34 27,34 32.5,37"
        style="fill:none; stroke:#000000;" />
    </g>
  `,
  bN: b`
    <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
        style="fill:#ffffff; stroke:#ffffff;" />
      <path
        d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
        transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        style="fill:#ffffff; stroke:#ffffff;" />
      <path
        d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
        style="fill:#ffffff; stroke:none;" />
    </g>
  `,
  wN: b`
    <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
        style="fill:#ffffff; stroke:#000000;" />
      <path
        d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
        style="fill:#ffffff; stroke:#000000;" />
      <path
        d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
        transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        style="fill:#000000; stroke:#000000;" />
    </g>
  `,
  bP: b`
    <path
      d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
      style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" />
  `,
  wP: b`
    <path
      d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
      style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" />
  `,
  bQ: b`
    <g style="opacity:1; fill:000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <g style="fill:#000000; stroke:none;">
        <circle cx="6"    cy="12" r="2.75" />
        <circle cx="14"   cy="9"  r="2.75" />
        <circle cx="22.5" cy="8"  r="2.75" />
        <circle cx="31"   cy="9"  r="2.75" />
        <circle cx="39"   cy="12" r="2.75" />
      </g>
      <path
        d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
        style="stroke-linecap:butt; stroke:#000000;" />
      <path
        d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
        style="stroke-linecap:butt;" />
      <path
        d="M 11,38.5 A 35,35 1 0 0 34,38.5"
        style="fill:none; stroke:#000000; stroke-linecap:butt;" />
      <path
        d="M 11,29 A 35,35 1 0 1 34,29"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 12.5,31.5 L 32.5,31.5"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
        style="fill:none; stroke:#ffffff;" />
    </g>
  `,
  wQ: b`
    <g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(-1,-1)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(15.5,-5.5)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(32,-1)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(7,-4.5)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(24,-4)" />
      <path
        d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 11.5,30 C 15,29 30,29 33.5,30"
        style="fill:none;" />
      <path
        d="M 12,33.5 C 18,32.5 27,32.5 33,33.5"
        style="fill:none;" />
    </g>
  `,
  bR: b`
    <g style="opacity:1; fill:000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
        style="stroke-linecap:butt;stroke-linejoin:miter;" />
      <path
        d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12,35.5 L 33,35.5 L 33,35.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 13,31.5 L 32,31.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 14,29.5 L 31,29.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 14,16.5 L 31,16.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 11,14 L 34,14"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
    </g>
  `,
  wR: b`
    <g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
        style="stroke-linecap:butt;" />
      <path
        d="M 34,14 L 31,17 L 14,17 L 11,14" />
      <path
        d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
        style="stroke-linecap:butt; stroke-linejoin:miter;" />
      <path
        d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
      <path
        d="M 11,14 L 34,14"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
    </g>
  `
};

// node_modules/chessboard-element/lib/chessboard-element.js
var assertIsDragging = function(dragState) {
  if ((dragState === null || dragState === undefined ? undefined : dragState.state) !== "dragging") {
    throw new Error(`unexpected drag state ${JSON.stringify(dragState)}`);
  }
};
var __decorate = function(decorators2, target, key, desc) {
  var c3 = arguments.length, r4 = c3 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r4 = Reflect.decorate(decorators2, target, key, desc);
  else
    for (var i7 = decorators2.length - 1;i7 >= 0; i7--)
      if (d3 = decorators2[i7])
        r4 = (c3 < 3 ? d3(r4) : c3 > 3 ? d3(target, key, r4) : d3(target, key)) || r4;
  return c3 > 3 && r4 && Object.defineProperty(target, key, r4), r4;
};
var DEFAULT_APPEAR_SPEED = 200;
var DEFAULT_MOVE_SPEED = 200;
var DEFAULT_SNAPBACK_SPEED = 60;
var DEFAULT_SNAP_SPEED = 30;
var DEFAULT_TRASH_SPEED = 100;
var speedToMS = (speed) => {
  if (typeof speed === "number") {
    return speed;
  }
  if (speed === "fast") {
    return 200;
  }
  if (speed === "slow") {
    return 600;
  }
  return parseInt(speed, 10);
};
var squareId = (square) => `square-${square}`;
var sparePieceId = (piece) => `spare-piece-${piece}`;

class RenderPieceDirective extends i5 {
  render(_piece, _renderPiece) {
    return A;
  }
  update(part, [piece, renderPiece2]) {
    if (isFunction(renderPiece2)) {
      renderPiece2(piece, part.element);
    } else {
      part.element.replaceChildren();
    }
    return T;
  }
}
var renderPieceDirective = e7(RenderPieceDirective);
var ChessBoardElement = class ChessBoardElement2 extends s4 {
  constructor() {
    super(...arguments);
    this.hideNotation = false;
    this.orientation = "white";
    this.draggablePieces = false;
    this.dropOffBoard = "snapback";
    this.renderPiece = (piece, container) => {
      let pieceImage = undefined;
      if (isString(this.pieceTheme)) {
        pieceImage = interpolateTemplate(this.pieceTheme, { piece });
      } else if (isFunction(this.pieceTheme)) {
        pieceImage = this.pieceTheme(piece);
      }
      if (pieceImage === undefined) {
        renderPiece(piece, container);
      } else {
        D(x`<img class="piece-image" src=${pieceImage} />`, container);
      }
    };
    this.moveSpeed = DEFAULT_MOVE_SPEED;
    this.snapbackSpeed = DEFAULT_SNAPBACK_SPEED;
    this.snapSpeed = DEFAULT_SNAP_SPEED;
    this.trashSpeed = DEFAULT_TRASH_SPEED;
    this.appearSpeed = DEFAULT_APPEAR_SPEED;
    this.sparePieces = false;
    this._highlightedSquares = new Set;
    this._animations = new Map;
    this._currentPosition = {};
    this._mousemoveWindow = (e8) => {
      var _a;
      if (!(((_a = this._dragState) === null || _a === undefined ? undefined : _a.state) === "dragging")) {
        return;
      }
      e8.preventDefault();
      const pos = e8 instanceof MouseEvent ? e8 : e8.changedTouches[0];
      this._updateDraggedPiece(pos.clientX, pos.clientY);
    };
    this._mouseupWindow = (e8) => {
      var _a;
      if (!(((_a = this._dragState) === null || _a === undefined ? undefined : _a.state) === "dragging")) {
        return;
      }
      const pos = e8 instanceof MouseEvent ? e8 : e8.changedTouches[0];
      const location = this._isXYOnSquare(pos.clientX, pos.clientY);
      this._stopDraggedPiece(location);
    };
  }
  get position() {
    return this._currentPosition;
  }
  set position(v2) {
    const oldValue = this._currentPosition;
    this._setCurrentPosition(v2);
    this.requestUpdate("position", oldValue);
  }
  get showNotation() {
    return !this.hideNotation;
  }
  set showNotation(v2) {
    this.hideNotation = !v2;
  }
  get _squareSize() {
    return this.offsetWidth / 8;
  }
  _getSquareElement(square) {
    return this.shadowRoot.getElementById(squareId(square));
  }
  _getSparePieceElement(piece) {
    return this.shadowRoot.getElementById(sparePieceId(piece));
  }
  render() {
    return x`
      <div part="spare-pieces">
        ${this._renderSparePieces(this.orientation === "white" ? "black" : "white")}
      </div>
      ${this._renderBoard()}
      <div part="spare-pieces">
        ${this._renderSparePieces(this.orientation === "white" ? "white" : "black")}
      </div>
      <div
        id="dragged-pieces"
        style=${o8({
      width: `${this._squareSize}px`,
      height: `${this._squareSize}px`
    })}
      >
        ${this._renderDraggedPiece()}
      </div>
    `;
  }
  _renderSparePieces(color) {
    if (!this.sparePieces) {
      return A;
    }
    const pieces2 = color === "black" ? blackPieces : whitePieces;
    return x`
      <div></div>
      ${pieces2.map((p2) => x`
            <div
              id="spare-${p2}"
              @mousedown=${this._mousedownSparePiece}
              @touchstart=${this._mousedownSparePiece}
            >
              ${this._renderPiece(p2, {}, false, sparePieceId(p2))}
            </div>
          `)}
      <div></div>
    `;
  }
  _renderDraggedPiece() {
    var _a, _b;
    const styles2 = {
      height: `${this._squareSize}px`,
      width: `${this._squareSize}px`
    };
    const dragState = this._dragState;
    if (dragState !== undefined) {
      styles2.display = "block";
      const rect = this.getBoundingClientRect();
      if (dragState.state === "dragging") {
        const { x: x2, y: y2 } = dragState;
        Object.assign(styles2, {
          top: `${y2 - rect.top - this._squareSize / 2}px`,
          left: `${x2 - rect.left - this._squareSize / 2}px`
        });
      } else if (dragState.state === "snapback") {
        const { source } = dragState;
        const square = this._getSquareElement(source);
        const squareRect = square.getBoundingClientRect();
        Object.assign(styles2, {
          transitionProperty: "top, left",
          transitionDuration: `${speedToMS(this.snapbackSpeed)}ms`,
          top: `${squareRect.top - rect.top}px`,
          left: `${squareRect.left - rect.left}px`
        });
      } else if (dragState.state === "trash") {
        const { x: x2, y: y2 } = dragState;
        Object.assign(styles2, {
          transitionProperty: "opacity",
          transitionDuration: `${speedToMS(this.trashSpeed)}ms`,
          opacity: "0",
          top: `${y2 - rect.top - this._squareSize / 2}px`,
          left: `${x2 - rect.left - this._squareSize / 2}px`
        });
      } else if (dragState.state === "snap") {
        const square = this._getSquareElement(dragState.location);
        const squareRect = square.getBoundingClientRect();
        Object.assign(styles2, {
          transitionProperty: "top, left",
          transitionDuration: `${speedToMS(this.snapSpeed)}ms`,
          top: `${squareRect.top - rect.top}px`,
          left: `${squareRect.left - rect.left}px`
        });
      }
    }
    return this._renderPiece((_b = (_a = this._dragState) === null || _a === undefined ? undefined : _a.piece) !== null && _b !== undefined ? _b : "", styles2, false, undefined, "dragged-piece");
  }
  _renderBoard() {
    var _a;
    const squares = [];
    const isFlipped = this.orientation === "black";
    for (let row = 0;row < 8; row++) {
      for (let col = 0;col < 8; col++) {
        const file = COLUMNS[isFlipped ? 7 - col : col];
        const rank = isFlipped ? row + 1 : 8 - row;
        const square = `${file}${rank}`;
        const squareColor = getSquareColor(square);
        let piece = this._currentPosition[square];
        const isDragSource = square === ((_a = this._dragState) === null || _a === undefined ? undefined : _a.source);
        const animation = this._animations.get(square);
        const highlight = isDragSource || this._highlightedSquares.has(square) ? "highlight" : "";
        const pieceStyles = this._getAnimationStyles(piece, animation);
        if (!piece && (animation === null || animation === undefined ? undefined : animation.type) === "clear") {
          piece = animation.piece;
        }
        squares.push(x`
          <div
            class="square"
            id=${squareId(square)}
            data-square=${square}
            part="square ${square} ${squareColor} ${highlight}"
            @mousedown=${this._mousedownSquare}
            @mouseenter=${this._mouseenterSquare}
            @mouseleave=${this._mouseleaveSquare}
            @touchstart=${this._mousedownSquare}
          >
            ${this.showNotation && row === 7 ? x`<div part="notation alpha">${file}</div>` : A}
            ${this.showNotation && col === 0 ? x`<div part="notation numeric">${rank}</div>` : A}
            ${this._renderPiece(piece, pieceStyles, isDragSource)}
          </div>
        `);
      }
    }
    const styles2 = {
      width: this._squareSize * 8 + "px",
      height: this._squareSize * 8 + "px"
    };
    return x`<div part="board" style=${o8(styles2)}>${squares}</div>`;
  }
  _renderPiece(piece, styles2, isDragSource, id, part) {
    if (piece === undefined) {
      return A;
    }
    const style = Object.assign({ opacity: "1", transitionProperty: "", transitionDuration: "0ms" }, styles2);
    if (isDragSource || piece === "") {
      style.display = "none";
    }
    if (piece === "") {
      return A;
    }
    if (!isFunction(this.renderPiece)) {
      this._error(8272, "invalid renderPiece.");
    }
    return x`
      <div
        id=${l5(id)}
        part="piece ${part !== null && part !== undefined ? part : ""}"
        piece=${piece}
        style=${o8(style)}
        ...=${renderPieceDirective(piece, this.renderPiece)}
      ></div>
    `;
  }
  _getAnimationStyles(piece, animation) {
    if (animation) {
      if (piece && (animation.type === "move-start" || animation.type === "add-start" && this.draggablePieces)) {
        const srcSquare = animation.type === "move-start" ? this._getSquareElement(animation.source) : this._getSparePieceElement(piece);
        const destSquare = animation.type === "move-start" ? this._getSquareElement(animation.destination) : this._getSquareElement(animation.square);
        const srcSquareRect = srcSquare.getBoundingClientRect();
        const destSquareRect = destSquare.getBoundingClientRect();
        return {
          position: "absolute",
          left: `${srcSquareRect.left - destSquareRect.left}px`,
          top: `${srcSquareRect.top - destSquareRect.top}px`,
          width: `${this._squareSize}px`,
          height: `${this._squareSize}px`
        };
      }
      if (piece && (animation.type === "move" || animation.type === "add" && this.draggablePieces)) {
        return {
          position: "absolute",
          transitionProperty: "top, left",
          transitionDuration: `${speedToMS(this.moveSpeed)}ms`,
          top: `0`,
          left: `0`,
          width: `${this._squareSize}px`,
          height: `${this._squareSize}px`
        };
      }
      if (!piece && animation.type === "clear") {
        piece = animation.piece;
        return {
          transitionProperty: "opacity",
          transitionDuration: `${speedToMS(this.trashSpeed)}ms`,
          opacity: "0"
        };
      }
      if (piece && animation.type === "add-start") {
        return {
          opacity: "0"
        };
      }
      if (piece && animation.type === "add") {
        return {
          transitionProperty: "opacity",
          transitionDuration: `${speedToMS(this.appearSpeed)}ms`
        };
      }
    }
    return {};
  }
  _mousedownSquare(e8) {
    if (!this.draggablePieces && !this.sparePieces) {
      return;
    }
    const squareEl = e8.currentTarget;
    const square = squareEl.getAttribute("data-square");
    if (square === null || !this._currentPosition.hasOwnProperty(square)) {
      return;
    }
    e8.preventDefault();
    const pos = e8 instanceof MouseEvent ? e8 : e8.changedTouches[0];
    this._beginDraggingPiece(square, this._currentPosition[square], pos.clientX, pos.clientY);
  }
  _mousedownSparePiece(e8) {
    if (!this.sparePieces) {
      return;
    }
    const sparePieceContainerEl = e8.currentTarget;
    const pieceEl = sparePieceContainerEl.querySelector("[part~=piece]");
    const piece = pieceEl.getAttribute("piece");
    e8.preventDefault();
    const pos = e8 instanceof MouseEvent ? e8 : e8.changedTouches[0];
    this._beginDraggingPiece("spare", piece, pos.clientX, pos.clientY);
  }
  _mouseenterSquare(e8) {
    if (this._dragState !== undefined) {
      return;
    }
    const square = e8.currentTarget.getAttribute("data-square");
    if (!validSquare(square)) {
      return;
    }
    const piece = this._currentPosition.hasOwnProperty(square) && this._currentPosition[square];
    this.dispatchEvent(new CustomEvent("mouseover-square", {
      bubbles: true,
      detail: {
        square,
        piece,
        position: deepCopy(this._currentPosition),
        orientation: this.orientation
      }
    }));
  }
  _mouseleaveSquare(e8) {
    if (this._dragState !== undefined) {
      return;
    }
    const square = e8.currentTarget.getAttribute("data-square");
    if (!validSquare(square)) {
      return;
    }
    const piece = this._currentPosition.hasOwnProperty(square) && this._currentPosition[square];
    this.dispatchEvent(new CustomEvent("mouseout-square", {
      bubbles: true,
      detail: {
        square,
        piece,
        position: deepCopy(this._currentPosition),
        orientation: this.orientation
      }
    }));
  }
  setPosition(position, useAnimation = true) {
    position = normalizePozition(position);
    if (!validPositionObject(position)) {
      throw this._error(6482, "Invalid value passed to the position method.", position);
    }
    if (useAnimation) {
      const animations = this._calculateAnimations(this._currentPosition, position);
      this._doAnimations(animations, this._currentPosition, position);
    }
    this._setCurrentPosition(position);
    this.requestUpdate();
  }
  fen() {
    return objToFen(this._currentPosition);
  }
  start(useAnimation) {
    this.setPosition("start", useAnimation);
  }
  clear(useAnimation) {
    this.setPosition({}, useAnimation);
  }
  move(...args) {
    let useAnimation = true;
    const moves = {};
    for (const arg of args) {
      if (arg === false) {
        useAnimation = false;
        continue;
      }
      if (!validMove(arg)) {
        this._error(2826, "Invalid move passed to the move method.", arg);
        continue;
      }
      const [from, to] = arg.split("-");
      moves[from] = to;
    }
    const newPos = calculatePositionFromMoves(this._currentPosition, moves);
    this.setPosition(newPos, useAnimation);
    return newPos;
  }
  flip() {
    this.orientation = this.orientation === "white" ? "black" : "white";
  }
  resize() {
    this.requestUpdate();
  }
  firstUpdated() {
    this.requestUpdate();
    if (window.ResizeObserver !== undefined) {
      new ResizeObserver(() => {
        this.resize();
      }).observe(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("mousemove", this._mousemoveWindow);
    window.addEventListener("mouseup", this._mouseupWindow);
    window.addEventListener("touchmove", this._mousemoveWindow, {
      passive: false
    });
    window.addEventListener("touchend", this._mouseupWindow, {
      passive: false
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("mousemove", this._mousemoveWindow);
    window.removeEventListener("mouseup", this._mouseupWindow);
    window.removeEventListener("touchmove", this._mousemoveWindow);
    window.removeEventListener("touchend", this._mouseupWindow);
  }
  _setCurrentPosition(position) {
    const oldPos = deepCopy(this._currentPosition);
    const newPos = deepCopy(position);
    const oldFen = objToFen(oldPos);
    const newFen = objToFen(newPos);
    if (oldFen === newFen)
      return;
    this.dispatchEvent(new CustomEvent("change", {
      bubbles: true,
      detail: {
        value: newPos,
        oldValue: oldPos
      }
    }));
    this._currentPosition = position;
  }
  _isXYOnSquare(x2, y2) {
    const elements = this.shadowRoot.elementsFromPoint(x2, y2);
    const squareEl = elements.find((e8) => e8.classList.contains("square"));
    const square = squareEl === undefined ? "offboard" : squareEl.getAttribute("data-square");
    return square;
  }
  _highlightSquare(square, value = true) {
    if (value) {
      this._highlightedSquares.add(square);
    } else {
      this._highlightedSquares.delete(square);
    }
    this.requestUpdate("_highlightedSquares");
  }
  async _snapbackDraggedPiece() {
    assertIsDragging(this._dragState);
    const { source, piece } = this._dragState;
    if (source === "spare") {
      return this._trashDraggedPiece();
    }
    this._dragState = {
      state: "snapback",
      piece,
      source
    };
    this.requestUpdate();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return new Promise((resolve) => {
      const transitionComplete = () => {
        this._draggedPieceElement.removeEventListener("transitionend", transitionComplete);
        resolve();
        this.dispatchEvent(new CustomEvent("snapback-end", {
          bubbles: true,
          detail: {
            piece,
            square: source,
            position: deepCopy(this._currentPosition),
            orientation: this.orientation
          }
        }));
      };
      this._draggedPieceElement.addEventListener("transitionend", transitionComplete);
    });
  }
  async _trashDraggedPiece() {
    assertIsDragging(this._dragState);
    const { source, piece } = this._dragState;
    const newPosition = deepCopy(this._currentPosition);
    delete newPosition[source];
    this._setCurrentPosition(newPosition);
    this._dragState = {
      state: "trash",
      piece,
      x: this._dragState.x,
      y: this._dragState.y,
      source: this._dragState.source
    };
    this.requestUpdate();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return new Promise((resolve) => {
      const transitionComplete = () => {
        this._draggedPieceElement.removeEventListener("transitionend", transitionComplete);
        resolve();
      };
      this._draggedPieceElement.addEventListener("transitionend", transitionComplete);
    });
  }
  async _dropDraggedPieceOnSquare(square) {
    assertIsDragging(this._dragState);
    const { source, piece } = this._dragState;
    const newPosition = deepCopy(this._currentPosition);
    delete newPosition[source];
    newPosition[square] = piece;
    this._setCurrentPosition(newPosition);
    this._dragState = {
      state: "snap",
      piece,
      location: square,
      source: square
    };
    this.requestUpdate();
    await new Promise((resolve) => setTimeout(resolve, 0));
    return new Promise((resolve) => {
      const transitionComplete = () => {
        this._draggedPieceElement.removeEventListener("transitionend", transitionComplete);
        resolve();
        this.dispatchEvent(new CustomEvent("snap-end", {
          bubbles: true,
          detail: {
            source,
            square,
            piece
          }
        }));
      };
      this._draggedPieceElement.addEventListener("transitionend", transitionComplete);
    });
  }
  _beginDraggingPiece(source, piece, x2, y2) {
    const event = new CustomEvent("drag-start", {
      bubbles: true,
      cancelable: true,
      detail: {
        source,
        piece,
        position: deepCopy(this._currentPosition),
        orientation: this.orientation
      }
    });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      return;
    }
    this._dragState = {
      state: "dragging",
      x: x2,
      y: y2,
      piece,
      location: source === "spare" ? "offboard" : source,
      source
    };
    this.requestUpdate();
  }
  _updateDraggedPiece(x2, y2) {
    assertIsDragging(this._dragState);
    this._dragState.x = x2;
    this._dragState.y = y2;
    this.requestUpdate();
    const location = this._isXYOnSquare(x2, y2);
    if (location === this._dragState.location) {
      return;
    }
    if (validSquare(this._dragState.location)) {
      this._highlightSquare(this._dragState.location, false);
    }
    if (validSquare(location)) {
      this._highlightSquare(location);
    }
    this.dispatchEvent(new CustomEvent("drag-move", {
      bubbles: true,
      detail: {
        newLocation: location,
        oldLocation: this._dragState.location,
        source: this._dragState.source,
        piece: this._dragState.piece,
        position: deepCopy(this._currentPosition),
        orientation: this.orientation
      }
    }));
    this._dragState.location = location;
  }
  async _stopDraggedPiece(location) {
    assertIsDragging(this._dragState);
    const { source, piece } = this._dragState;
    let action = "drop";
    if (location === "offboard") {
      action = this.dropOffBoard === "trash" ? "trash" : "snapback";
    }
    const newPosition = deepCopy(this._currentPosition);
    const oldPosition = deepCopy(this._currentPosition);
    if (source === "spare" && validSquare(location)) {
      newPosition[location] = piece;
    }
    if (validSquare(source)) {
      delete newPosition[source];
      if (validSquare(location)) {
        newPosition[location] = piece;
      }
    }
    const dropEvent = new CustomEvent("drop", {
      bubbles: true,
      detail: {
        source,
        target: location,
        piece,
        newPosition,
        oldPosition,
        orientation: this.orientation,
        setAction(a3) {
          action = a3;
        }
      }
    });
    this.dispatchEvent(dropEvent);
    this._highlightedSquares.clear();
    if (action === "snapback") {
      await this._snapbackDraggedPiece();
    } else if (action === "trash") {
      await this._trashDraggedPiece();
    } else if (action === "drop") {
      await this._dropDraggedPieceOnSquare(location);
    }
    this._dragState = undefined;
    this.requestUpdate();
  }
  _calculateAnimations(pos1, pos2) {
    pos1 = deepCopy(pos1);
    pos2 = deepCopy(pos2);
    const animations = [];
    const squaresMovedTo = {};
    for (const i7 in pos2) {
      if (!pos2.hasOwnProperty(i7))
        continue;
      if (pos1.hasOwnProperty(i7) && pos1[i7] === pos2[i7]) {
        delete pos1[i7];
        delete pos2[i7];
      }
    }
    for (const i7 in pos2) {
      if (!pos2.hasOwnProperty(i7))
        continue;
      const closestPiece = findClosestPiece(pos1, pos2[i7], i7);
      if (closestPiece) {
        animations.push({
          type: "move",
          source: closestPiece,
          destination: i7,
          piece: pos2[i7]
        });
        delete pos1[closestPiece];
        delete pos2[i7];
        squaresMovedTo[i7] = true;
      }
    }
    for (const i7 in pos2) {
      if (!pos2.hasOwnProperty(i7)) {
        continue;
      }
      animations.push({
        type: "add",
        square: i7,
        piece: pos2[i7]
      });
      delete pos2[i7];
    }
    for (const i7 in pos1) {
      if (!pos1.hasOwnProperty(i7))
        continue;
      if (squaresMovedTo.hasOwnProperty(i7))
        continue;
      animations.push({
        type: "clear",
        square: i7,
        piece: pos1[i7]
      });
      delete pos1[i7];
    }
    return animations;
  }
  async _doAnimations(animations, oldPos, newPos) {
    if (animations.length === 0) {
      return;
    }
    let numFinished = 0;
    const transitionEndListener = () => {
      numFinished++;
      if (numFinished === animations.length) {
        this.shadowRoot.removeEventListener("transitionend", transitionEndListener);
        this._animations.clear();
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("move-end", {
          bubbles: true,
          detail: {
            oldPosition: deepCopy(oldPos),
            newPosition: deepCopy(newPos)
          }
        }));
      }
    };
    this.shadowRoot.addEventListener("transitionend", transitionEndListener);
    this._animations.clear();
    for (const animation of animations) {
      if (animation.type === "add" || animation.type === "add-start") {
        this._animations.set(animation.square, Object.assign(Object.assign({}, animation), { type: "add-start" }));
      } else if (animation.type === "move" || animation.type === "move-start") {
        this._animations.set(animation.destination, Object.assign(Object.assign({}, animation), { type: "move-start" }));
      } else {
        this._animations.set(animation.square, animation);
      }
    }
    this.requestUpdate();
    await new Promise((resolve) => setTimeout(resolve, 0));
    this._animations.clear();
    for (const animation of animations) {
      if (animation.type === "move" || animation.type === "move-start") {
        this._animations.set(animation.destination, animation);
      } else {
        this._animations.set(animation.square, animation);
      }
    }
    this.requestUpdate();
  }
  _error(code, msg, _obj) {
    const errorText = `Chessboard Error ${code} : ${msg}`;
    this.dispatchEvent(new ErrorEvent("error", {
      message: errorText
    }));
    return new Error(errorText);
  }
};
ChessBoardElement.styles = styles;
__decorate([
  n5({
    converter: (value) => normalizePozition(value)
  })
], ChessBoardElement.prototype, "position", null);
__decorate([
  n5({
    attribute: "hide-notation",
    type: Boolean
  })
], ChessBoardElement.prototype, "hideNotation", undefined);
__decorate([
  n5()
], ChessBoardElement.prototype, "orientation", undefined);
__decorate([
  n5({
    attribute: "draggable-pieces",
    type: Boolean
  })
], ChessBoardElement.prototype, "draggablePieces", undefined);
__decorate([
  n5({ attribute: "drop-off-board" })
], ChessBoardElement.prototype, "dropOffBoard", undefined);
__decorate([
  n5({ attribute: "piece-theme" })
], ChessBoardElement.prototype, "pieceTheme", undefined);
__decorate([
  n5({ attribute: false })
], ChessBoardElement.prototype, "renderPiece", undefined);
__decorate([
  n5({
    attribute: "move-speed"
  })
], ChessBoardElement.prototype, "moveSpeed", undefined);
__decorate([
  n5({
    attribute: "snapback-speed"
  })
], ChessBoardElement.prototype, "snapbackSpeed", undefined);
__decorate([
  n5({
    attribute: "snap-speed"
  })
], ChessBoardElement.prototype, "snapSpeed", undefined);
__decorate([
  n5({
    attribute: "trash-speed"
  })
], ChessBoardElement.prototype, "trashSpeed", undefined);
__decorate([
  n5({
    attribute: "appear-speed"
  })
], ChessBoardElement.prototype, "appearSpeed", undefined);
__decorate([
  n5({
    attribute: "spare-pieces",
    type: Boolean
  })
], ChessBoardElement.prototype, "sparePieces", undefined);
__decorate([
  i4('[part~="dragged-piece"]')
], ChessBoardElement.prototype, "_draggedPieceElement", undefined);
ChessBoardElement = __decorate([
  e4("chess-board")
], ChessBoardElement);
// src/components/board.ts
class Board extends s4 {
  constructor() {
    super(...arguments);
  }
  render() {
    new ChessBoardElement;
    return x`
      <chess-board position="start" style="width: 400px"></chess-board>    
    `;
  }
}
Board = __decorateClass([
  e4("cb-board")
], Board);

// node_modules/tslib/tslib.es6.mjs
function __decorate2(decorators3, target, key, desc) {
  var c3 = arguments.length, r4 = c3 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r4 = Reflect.decorate(decorators3, target, key, desc);
  else
    for (var i7 = decorators3.length - 1;i7 >= 0; i7--)
      if (d3 = decorators3[i7])
        r4 = (c3 < 3 ? d3(r4) : c3 > 3 ? d3(target, key, r4) : d3(target, key)) || r4;
  return c3 > 3 && r4 && Object.defineProperty(target, key, r4), r4;
}

// node_modules/@material/web/divider/internal/divider.js
class Divider extends s4 {
  constructor() {
    super(...arguments);
    this.inset = false;
    this.insetStart = false;
    this.insetEnd = false;
  }
}
__decorate2([
  n5({ type: Boolean, reflect: true })
], Divider.prototype, "inset", undefined);
__decorate2([
  n5({ type: Boolean, reflect: true, attribute: "inset-start" })
], Divider.prototype, "insetStart", undefined);
__decorate2([
  n5({ type: Boolean, reflect: true, attribute: "inset-end" })
], Divider.prototype, "insetEnd", undefined);

// node_modules/@material/web/divider/internal/divider-styles.css.js
var styles2 = i`:host{--_color: var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));--_thickness: var(--md-divider-thickness, 1px);box-sizing:border-box;color:var(--_color);display:flex;height:var(--_thickness);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}/*# sourceMappingURL=divider-styles.css.map */
`;

// node_modules/@material/web/divider/divider.js
var MdDivider = class MdDivider2 extends Divider {
};
MdDivider.styles = [styles2];
MdDivider = __decorate2([
  e4("md-divider")
], MdDivider);

// node_modules/@material/web/internal/aria/aria.js
function ariaPropertyToAttribute(property4) {
  return property4.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
}
function setupHostAria(ctor, { focusable } = {}) {
  if (focusable !== false) {
    ctor.addInitializer((host) => {
      host.addController({
        hostConnected() {
          if (host.hasAttribute("tabindex")) {
            return;
          }
          host.tabIndex = 0;
        }
      });
    });
  }
  if (o5 || ("role" in Element.prototype)) {
    return;
  }
  for (const ariaProperty of ARIA_PROPERTIES) {
    ctor.createProperty(ariaProperty, {
      attribute: ariaPropertyToAttribute(ariaProperty),
      reflect: true
    });
  }
  ctor.createProperty("role", { reflect: true });
}
function polyfillElementInternalsAria(host, internals) {
  if (checkIfElementInternalsSupportsAria(internals)) {
    return internals;
  }
  if (!("role" in host)) {
    throw new Error("Missing setupHostAria()");
  }
  let firstConnectedCallbacks = [];
  let hasBeenConnected = false;
  for (const ariaProperty of ARIA_PROPERTIES) {
    let internalAriaValue = null;
    Object.defineProperty(internals, ariaProperty, {
      enumerable: true,
      configurable: true,
      get() {
        return internalAriaValue;
      },
      set(value) {
        const setValue = () => {
          internalAriaValue = value;
          if (!hasBeenConnected) {
            firstConnectedCallbacks.push({ property: ariaProperty, callback: setValue });
            return;
          }
          host[ariaProperty] = value;
        };
        setValue();
      }
    });
  }
  let internalRoleValue = null;
  Object.defineProperty(internals, "role", {
    enumerable: true,
    configurable: true,
    get() {
      return internalRoleValue;
    },
    set(value) {
      const setRole = () => {
        internalRoleValue = value;
        if (!hasBeenConnected) {
          firstConnectedCallbacks.push({
            property: "role",
            callback: setRole
          });
          return;
        }
        if (value === null) {
          host.removeAttribute("role");
        } else {
          host.setAttribute("role", value);
        }
      };
      setRole();
    }
  });
  host.addController({
    hostConnected() {
      if (hasBeenConnected) {
        return;
      }
      hasBeenConnected = true;
      const propertiesSetByUser = new Set;
      for (const { property: property4 } of firstConnectedCallbacks) {
        const wasSetByUser = host.getAttribute(ariaPropertyToAttribute(property4)) !== null || host[property4] !== undefined;
        if (wasSetByUser) {
          propertiesSetByUser.add(property4);
        }
      }
      for (const { property: property4, callback } of firstConnectedCallbacks) {
        if (propertiesSetByUser.has(property4)) {
          continue;
        }
        callback();
      }
      firstConnectedCallbacks = [];
    }
  });
  return internals;
}
var checkIfElementInternalsSupportsAria = function(internals) {
  return "role" in internals;
};
var ARIA_PROPERTIES = [
  "ariaAtomic",
  "ariaAutoComplete",
  "ariaBusy",
  "ariaChecked",
  "ariaColCount",
  "ariaColIndex",
  "ariaColSpan",
  "ariaCurrent",
  "ariaDisabled",
  "ariaExpanded",
  "ariaHasPopup",
  "ariaHidden",
  "ariaInvalid",
  "ariaKeyShortcuts",
  "ariaLabel",
  "ariaLevel",
  "ariaLive",
  "ariaModal",
  "ariaMultiLine",
  "ariaMultiSelectable",
  "ariaOrientation",
  "ariaPlaceholder",
  "ariaPosInSet",
  "ariaPressed",
  "ariaReadOnly",
  "ariaRequired",
  "ariaRoleDescription",
  "ariaRowCount",
  "ariaRowIndex",
  "ariaRowSpan",
  "ariaSelected",
  "ariaSetSize",
  "ariaSort",
  "ariaValueMax",
  "ariaValueMin",
  "ariaValueNow",
  "ariaValueText"
];
var ARIA_ATTRIBUTES = ARIA_PROPERTIES.map(ariaPropertyToAttribute);

// node_modules/@material/web/elevation/internal/elevation.js
class Elevation extends s4 {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }
  render() {
    return x`<span class="shadow"></span>`;
  }
}

// node_modules/@material/web/elevation/internal/elevation-styles.css.js
var styles3 = i`:host{--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000));display:flex;pointer-events:none}:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}/*# sourceMappingURL=elevation-styles.css.map */
`;

// node_modules/@material/web/elevation/elevation.js
var MdElevation = class MdElevation2 extends Elevation {
};
MdElevation.styles = [styles3];
MdElevation = __decorate2([
  e4("md-elevation")
], MdElevation);

// node_modules/@material/web/internal/controller/attachable-controller.js
var ATTACHABLE_CONTROLLER = Symbol("attachableController");
var FOR_ATTRIBUTE_OBSERVER;
if (!o5) {
  FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
    for (const record of records) {
      record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
    }
  });
}

class AttachableController {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(htmlFor) {
    if (htmlFor === null) {
      this.host.removeAttribute("for");
    } else {
      this.host.setAttribute("for", htmlFor);
    }
  }
  get control() {
    if (this.host.hasAttribute("for")) {
      if (!this.htmlFor || !this.host.isConnected) {
        return null;
      }
      return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
    }
    return this.currentControl || this.host.parentElement;
  }
  set control(control) {
    if (control) {
      this.attach(control);
    } else {
      this.detach();
    }
  }
  constructor(host, onControlChange) {
    this.host = host;
    this.onControlChange = onControlChange;
    this.currentControl = null;
    host.addController(this);
    host[ATTACHABLE_CONTROLLER] = this;
    FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ["for"] });
  }
  attach(control) {
    if (control === this.currentControl) {
      return;
    }
    this.setCurrentControl(control);
    this.host.removeAttribute("for");
  }
  detach() {
    this.setCurrentControl(null);
    this.host.setAttribute("for", "");
  }
  hostConnected() {
    this.setCurrentControl(this.control);
  }
  hostDisconnected() {
    this.setCurrentControl(null);
  }
  setCurrentControl(control) {
    this.onControlChange(this.currentControl, control);
    this.currentControl = control;
  }
}

// node_modules/@material/web/focus/internal/focus-ring.js
var EVENTS = ["focusin", "focusout", "pointerdown"];

class FocusRing extends s4 {
  constructor() {
    super(...arguments);
    this.visible = false;
    this.inward = false;
    this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(htmlFor) {
    this.attachableController.htmlFor = htmlFor;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(control) {
    this.attachableController.control = control;
  }
  attach(control) {
    this.attachableController.attach(control);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }
  handleEvent(event) {
    if (event[HANDLED_BY_FOCUS_RING]) {
      return;
    }
    switch (event.type) {
      default:
        return;
      case "focusin":
        this.visible = this.control?.matches(":focus-visible") ?? false;
        break;
      case "focusout":
      case "pointerdown":
        this.visible = false;
        break;
    }
    event[HANDLED_BY_FOCUS_RING] = true;
  }
  onControlChange(prev, next) {
    if (o5)
      return;
    for (const event of EVENTS) {
      prev?.removeEventListener(event, this);
      next?.addEventListener(event, this);
    }
  }
  update(changed) {
    if (changed.has("visible")) {
      this.dispatchEvent(new Event("visibility-changed"));
    }
    super.update(changed);
  }
}
__decorate2([
  n5({ type: Boolean, reflect: true })
], FocusRing.prototype, "visible", undefined);
__decorate2([
  n5({ type: Boolean, reflect: true })
], FocusRing.prototype, "inward", undefined);
var HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");

// node_modules/@material/web/focus/internal/focus-ring-styles.css.js
var styles4 = i`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}/*# sourceMappingURL=focus-ring-styles.css.map */
`;

// node_modules/@material/web/focus/md-focus-ring.js
var MdFocusRing = class MdFocusRing2 extends FocusRing {
};
MdFocusRing.styles = [styles4];
MdFocusRing = __decorate2([
  e4("md-focus-ring")
], MdFocusRing);

// node_modules/lit/node_modules/lit-html/directives/class-map.js
var o9 = e7(class extends i5 {
  constructor(t5) {
    var i7;
    if (super(t5), t5.type !== t4.ATTRIBUTE || t5.name !== "class" || ((i7 = t5.strings) === null || i7 === undefined ? undefined : i7.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return " " + Object.keys(t5).filter((i7) => t5[i7]).join(" ") + " ";
  }
  update(i7, [s5]) {
    var r4, o10;
    if (this.it === undefined) {
      this.it = new Set, i7.strings !== undefined && (this.nt = new Set(i7.strings.join(" ").split(/\s/).filter((t5) => t5 !== "")));
      for (const t5 in s5)
        s5[t5] && !((r4 = this.nt) === null || r4 === undefined ? undefined : r4.has(t5)) && this.it.add(t5);
      return this.render(s5);
    }
    const e8 = i7.element.classList;
    this.it.forEach((t5) => {
      (t5 in s5) || (e8.remove(t5), this.it.delete(t5));
    });
    for (const t5 in s5) {
      const i8 = !!s5[t5];
      i8 === this.it.has(t5) || ((o10 = this.nt) === null || o10 === undefined ? undefined : o10.has(t5)) || (i8 ? (e8.add(t5), this.it.add(t5)) : (e8.remove(t5), this.it.delete(t5)));
    }
    return T;
  }
});
// node_modules/@material/web/internal/motion/animation.js
var EASING = {
  STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
  STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
  STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
  EMPHASIZED: "cubic-bezier(.3,0,0,1)",
  EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
  EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
};

// node_modules/@material/web/ripple/internal/ripple.js
var PRESS_GROW_MS = 450;
var MINIMUM_PRESS_MS = 225;
var INITIAL_ORIGIN_SCALE = 0.2;
var PADDING = 10;
var SOFT_EDGE_MINIMUM_SIZE = 75;
var SOFT_EDGE_CONTAINER_RATIO = 0.35;
var PRESS_PSEUDO = "::after";
var ANIMATION_FILL = "forwards";
var State;
(function(State2) {
  State2[State2["INACTIVE"] = 0] = "INACTIVE";
  State2[State2["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
  State2[State2["HOLDING"] = 2] = "HOLDING";
  State2[State2["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
})(State || (State = {}));
var EVENTS2 = [
  "click",
  "contextmenu",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointerup"
];
var TOUCH_DELAY_MS = 150;

class Ripple extends s4 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.hovered = false;
    this.pressed = false;
    this.rippleSize = "";
    this.rippleScale = "";
    this.initialSize = 0;
    this.state = State.INACTIVE;
    this.checkBoundsAfterContextMenu = false;
    this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(htmlFor) {
    this.attachableController.htmlFor = htmlFor;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(control) {
    this.attachableController.control = control;
  }
  attach(control) {
    this.attachableController.attach(control);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }
  render() {
    const classes = {
      hovered: this.hovered,
      pressed: this.pressed
    };
    return x`<div class="surface ${o9(classes)}"></div>`;
  }
  update(changedProps) {
    if (changedProps.has("disabled") && this.disabled) {
      this.hovered = false;
      this.pressed = false;
    }
    super.update(changedProps);
  }
  handlePointerenter(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.hovered = true;
  }
  handlePointerleave(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.hovered = false;
    if (this.state !== State.INACTIVE) {
      this.endPressAnimation();
    }
  }
  handlePointerup(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    if (this.state === State.HOLDING) {
      this.state = State.WAITING_FOR_CLICK;
      return;
    }
    if (this.state === State.TOUCH_DELAY) {
      this.state = State.WAITING_FOR_CLICK;
      this.startPressAnimation(this.rippleStartEvent);
      return;
    }
  }
  async handlePointerdown(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.rippleStartEvent = event;
    if (!this.isTouch(event)) {
      this.state = State.WAITING_FOR_CLICK;
      this.startPressAnimation(event);
      return;
    }
    if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
      return;
    }
    this.checkBoundsAfterContextMenu = false;
    this.state = State.TOUCH_DELAY;
    await new Promise((resolve) => {
      setTimeout(resolve, TOUCH_DELAY_MS);
    });
    if (this.state !== State.TOUCH_DELAY) {
      return;
    }
    this.state = State.HOLDING;
    this.startPressAnimation(event);
  }
  handleClick() {
    if (this.disabled) {
      return;
    }
    if (this.state === State.WAITING_FOR_CLICK) {
      this.endPressAnimation();
      return;
    }
    if (this.state === State.INACTIVE) {
      this.startPressAnimation();
      this.endPressAnimation();
    }
  }
  handlePointercancel(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.endPressAnimation();
  }
  handleContextmenu() {
    if (this.disabled) {
      return;
    }
    this.checkBoundsAfterContextMenu = true;
    this.endPressAnimation();
  }
  determineRippleSize() {
    const { height, width } = this.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;
    this.initialSize = initialSize;
    this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
    this.rippleSize = `${initialSize}px`;
  }
  getNormalizedPointerEventCoords(pointerEvent) {
    const { scrollX, scrollY } = window;
    const { left, top } = this.getBoundingClientRect();
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    const { pageX, pageY } = pointerEvent;
    return { x: pageX - documentX, y: pageY - documentY };
  }
  getTranslationCoordinates(positionEvent) {
    const { height, width } = this.getBoundingClientRect();
    const endPoint = {
      x: (width - this.initialSize) / 2,
      y: (height - this.initialSize) / 2
    };
    let startPoint;
    if (positionEvent instanceof PointerEvent) {
      startPoint = this.getNormalizedPointerEventCoords(positionEvent);
    } else {
      startPoint = {
        x: width / 2,
        y: height / 2
      };
    }
    startPoint = {
      x: startPoint.x - this.initialSize / 2,
      y: startPoint.y - this.initialSize / 2
    };
    return { startPoint, endPoint };
  }
  startPressAnimation(positionEvent) {
    if (!this.mdRoot) {
      return;
    }
    this.pressed = true;
    this.growAnimation?.cancel();
    this.determineRippleSize();
    const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    this.growAnimation = this.mdRoot.animate({
      top: [0, 0],
      left: [0, 0],
      height: [this.rippleSize, this.rippleSize],
      width: [this.rippleSize, this.rippleSize],
      transform: [
        `translate(${translateStart}) scale(1)`,
        `translate(${translateEnd}) scale(${this.rippleScale})`
      ]
    }, {
      pseudoElement: PRESS_PSEUDO,
      duration: PRESS_GROW_MS,
      easing: EASING.STANDARD,
      fill: ANIMATION_FILL
    });
  }
  async endPressAnimation() {
    this.state = State.INACTIVE;
    const animation2 = this.growAnimation;
    const pressAnimationPlayState = animation2?.currentTime ?? Infinity;
    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      this.pressed = false;
      return;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });
    if (this.growAnimation !== animation2) {
      return;
    }
    this.pressed = false;
  }
  shouldReactToEvent(event) {
    if (this.disabled || !event.isPrimary) {
      return false;
    }
    if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
      return false;
    }
    if (event.type === "pointerenter" || event.type === "pointerleave") {
      return !this.isTouch(event);
    }
    const isPrimaryButton = event.buttons === 1;
    return this.isTouch(event) || isPrimaryButton;
  }
  inBounds({ x: x2, y: y2 }) {
    const { top, left, bottom, right } = this.getBoundingClientRect();
    return x2 >= left && x2 <= right && y2 >= top && y2 <= bottom;
  }
  isTouch({ pointerType }) {
    return pointerType === "touch";
  }
  async handleEvent(event) {
    switch (event.type) {
      case "click":
        this.handleClick();
        break;
      case "contextmenu":
        this.handleContextmenu();
        break;
      case "pointercancel":
        this.handlePointercancel(event);
        break;
      case "pointerdown":
        await this.handlePointerdown(event);
        break;
      case "pointerenter":
        this.handlePointerenter(event);
        break;
      case "pointerleave":
        this.handlePointerleave(event);
        break;
      case "pointerup":
        this.handlePointerup(event);
        break;
      default:
        break;
    }
  }
  onControlChange(prev, next) {
    if (o5)
      return;
    for (const event of EVENTS2) {
      prev?.removeEventListener(event, this);
      next?.addEventListener(event, this);
    }
  }
}
__decorate2([
  n5({ type: Boolean, reflect: true })
], Ripple.prototype, "disabled", undefined);
__decorate2([
  t3()
], Ripple.prototype, "hovered", undefined);
__decorate2([
  t3()
], Ripple.prototype, "pressed", undefined);
__decorate2([
  i4(".surface")
], Ripple.prototype, "mdRoot", undefined);

// node_modules/@material/web/ripple/internal/ripple-styles.css.js
var styles5 = i`:host{--_hover-color: var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-opacity: var(--md-ripple-hover-opacity, 0.08);--_pressed-color: var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-opacity: var(--md-ripple-pressed-opacity, 0.12);display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--_hover-color);inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--_pressed-color) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--_hover-color);opacity:var(--_hover-opacity)}.pressed::after{opacity:var(--_pressed-opacity);transition-duration:105ms}/*# sourceMappingURL=ripple-styles.css.map */
`;

// node_modules/@material/web/ripple/ripple.js
var MdRipple = class MdRipple2 extends Ripple {
};
MdRipple.styles = [styles5];
MdRipple = __decorate2([
  e4("md-ripple")
], MdRipple);

// node_modules/@material/web/tabs/internal/tab.js
var shouldReduceMotion = function() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
var _a;
var INDICATOR = Symbol("indicator");
var ANIMATE_INDICATOR = Symbol("animateIndicator");

class Tab extends s4 {
  get selected() {
    return this.active;
  }
  set selected(active) {
    this.active = active;
  }
  constructor() {
    super();
    this.active = false;
    this.hasIcon = false;
    this.iconOnly = false;
    this.fullWidthIndicator = false;
    this.internals = polyfillElementInternalsAria(this, this.attachInternals());
    if (!o5) {
      this.internals.role = "tab";
      this.addEventListener("keydown", this.handleKeydown.bind(this));
    }
  }
  render() {
    const indicator = x`<div class="indicator"></div>`;
    return x`
      <div class="button" role="presentation" @click=${this.handleContentClick}>
        <md-focus-ring part="focus-ring" inward
            .control=${this}></md-focus-ring>
        <md-elevation></md-elevation>
        <md-ripple .control=${this}></md-ripple>
        <div class="content ${o9(this.getContentClasses())}"
            role="presentation">
          <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
          <slot @slotchange=${this.handleSlotChange}></slot>
          ${this.fullWidthIndicator ? A : indicator}
        </div>
        ${this.fullWidthIndicator ? indicator : A}
      </div>`;
  }
  getContentClasses() {
    return {
      "has-icon": this.hasIcon,
      "has-label": !this.iconOnly
    };
  }
  updated() {
    this.internals.ariaSelected = String(this.active);
  }
  async handleKeydown(event) {
    await 0;
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.click();
    }
  }
  handleContentClick(event) {
    event.stopPropagation();
    this.click();
  }
  [(_a = INDICATOR, ANIMATE_INDICATOR)](previousTab) {
    if (!this[INDICATOR]) {
      return;
    }
    this[INDICATOR].getAnimations().forEach((a3) => {
      a3.cancel();
    });
    const frames = this.getKeyframes(previousTab);
    if (frames !== null) {
      this[INDICATOR].animate(frames, { duration: 250, easing: EASING.EMPHASIZED });
    }
  }
  getKeyframes(previousTab) {
    const reduceMotion = shouldReduceMotion();
    if (!this.active) {
      return reduceMotion ? [{ opacity: 1 }, { transform: "none" }] : null;
    }
    const from = {};
    const fromRect = previousTab[INDICATOR]?.getBoundingClientRect() ?? {};
    const fromPos = fromRect.left;
    const fromExtent = fromRect.width;
    const toRect = this[INDICATOR].getBoundingClientRect();
    const toPos = toRect.left;
    const toExtent = toRect.width;
    const scale = fromExtent / toExtent;
    if (!reduceMotion && fromPos !== undefined && toPos !== undefined && !isNaN(scale)) {
      from["transform"] = `translateX(${(fromPos - toPos).toFixed(4)}px) scaleX(${scale.toFixed(4)})`;
    } else {
      from["opacity"] = 0;
    }
    return [from, { transform: "none" }];
  }
  handleSlotChange() {
    this.iconOnly = false;
    for (const node of this.assignedDefaultNodes) {
      const hasTextContent = node.nodeType === Node.TEXT_NODE && !!node.wholeText.match(/\S/);
      if (node.nodeType === Node.ELEMENT_NODE || hasTextContent) {
        return;
      }
    }
    this.iconOnly = true;
  }
  handleIconSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
(() => {
  setupHostAria(Tab);
})();
__decorate2([
  n5({ type: Boolean, reflect: true })
], Tab.prototype, "active", undefined);
__decorate2([
  n5({ type: Boolean })
], Tab.prototype, "selected", null);
__decorate2([
  n5({ type: Boolean, attribute: "has-icon" })
], Tab.prototype, "hasIcon", undefined);
__decorate2([
  n5({ type: Boolean, attribute: "icon-only" })
], Tab.prototype, "iconOnly", undefined);
__decorate2([
  i4(".indicator")
], Tab.prototype, _a, undefined);
__decorate2([
  t3()
], Tab.prototype, "fullWidthIndicator", undefined);
__decorate2([
  o7({ flatten: true })
], Tab.prototype, "assignedDefaultNodes", undefined);
__decorate2([
  l4({ slot: "icon", flatten: true })
], Tab.prototype, "assignedIcons", undefined);

// node_modules/@material/web/tabs/internal/tabs.js
var isTab = function(element) {
  return element instanceof Tab;
};

class Tabs extends s4 {
  get tabs() {
    return this.maybeTabs.filter(isTab);
  }
  get activeTab() {
    return this.tabs.find((tab2) => tab2.active) ?? null;
  }
  set activeTab(tab2) {
    if (tab2) {
      this.activateTab(tab2);
    }
  }
  get activeTabIndex() {
    return this.tabs.findIndex((tab2) => tab2.active);
  }
  set activeTabIndex(index) {
    const activateTabAtIndex = () => {
      const tab2 = this.tabs[index];
      if (tab2) {
        this.activateTab(tab2);
      }
    };
    if (!this.slotElement) {
      this.updateComplete.then(activateTabAtIndex);
      return;
    }
    activateTabAtIndex();
  }
  get focusedTab() {
    return this.tabs.find((tab2) => tab2.matches(":focus-within"));
  }
  constructor() {
    super();
    this.autoActivate = false;
    this.internals = polyfillElementInternalsAria(this, this.attachInternals());
    if (!o5) {
      this.internals.role = "tablist";
      this.addEventListener("keydown", this.handleKeydown.bind(this));
      this.addEventListener("keyup", this.handleKeyup.bind(this));
      this.addEventListener("focusout", this.handleFocusout.bind(this));
    }
  }
  async scrollToTab(tabToScrollTo) {
    await this.updateComplete;
    const { tabs } = this;
    tabToScrollTo ?? (tabToScrollTo = this.activeTab);
    if (!tabToScrollTo || !tabs.includes(tabToScrollTo)) {
      return;
    }
    for (const tab2 of this.tabs) {
      await tab2.updateComplete;
    }
    const offset = tabToScrollTo.offsetLeft;
    const extent = tabToScrollTo.offsetWidth;
    const scroll = this.scrollLeft;
    const hostExtent = this.offsetWidth;
    const scrollMargin = 48;
    const min = offset - scrollMargin;
    const max = offset + extent - hostExtent + scrollMargin;
    const to = Math.min(min, Math.max(max, scroll));
    const behavior = !this.focusedTab ? "smooth" : "instant";
    this.scrollTo({ behavior, top: 0, left: to });
  }
  render() {
    return x`
      <div class="tabs">
        <slot @slotchange=${this.handleSlotChange}
            @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `;
  }
  async handleTabClick(event) {
    const tab2 = event.target;
    await 0;
    if (event.defaultPrevented || !isTab(tab2) || tab2.active) {
      return;
    }
    this.activateTab(tab2);
  }
  activateTab(activeTab) {
    const { tabs } = this;
    const previousTab = this.activeTab;
    if (!tabs.includes(activeTab) || previousTab === activeTab) {
      return;
    }
    for (const tab2 of tabs) {
      tab2.active = tab2 === activeTab;
    }
    if (previousTab) {
      const defaultPrevented = !this.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      if (defaultPrevented) {
        for (const tab2 of tabs) {
          tab2.active = tab2 === previousTab;
        }
        return;
      }
      activeTab[ANIMATE_INDICATOR](previousTab);
    }
    this.updateFocusableTab(activeTab);
    this.scrollToTab(activeTab);
  }
  updateFocusableTab(focusableTab) {
    for (const tab2 of this.tabs) {
      tab2.tabIndex = tab2 === focusableTab ? 0 : -1;
    }
  }
  async handleKeydown(event) {
    await 0;
    const isLeft = event.key === "ArrowLeft";
    const isRight = event.key === "ArrowRight";
    const isHome = event.key === "Home";
    const isEnd = event.key === "End";
    if (event.defaultPrevented || !isLeft && !isRight && !isHome && !isEnd) {
      return;
    }
    const { tabs } = this;
    if (tabs.length < 2) {
      return;
    }
    event.preventDefault();
    let indexToFocus;
    if (isHome || isEnd) {
      indexToFocus = isHome ? 0 : tabs.length - 1;
    } else {
      const isRtl = getComputedStyle(this).direction === "rtl";
      const forwards = isRtl ? isLeft : isRight;
      const { focusedTab } = this;
      if (!focusedTab) {
        indexToFocus = forwards ? 0 : tabs.length - 1;
      } else {
        const focusedIndex = this.tabs.indexOf(focusedTab);
        indexToFocus = forwards ? focusedIndex + 1 : focusedIndex - 1;
        if (indexToFocus >= tabs.length) {
          indexToFocus = 0;
        } else if (indexToFocus < 0) {
          indexToFocus = tabs.length - 1;
        }
      }
    }
    const tabToFocus = tabs[indexToFocus];
    tabToFocus.focus();
    if (this.autoActivate) {
      this.activateTab(tabToFocus);
    } else {
      this.updateFocusableTab(tabToFocus);
    }
  }
  handleKeyup() {
    this.scrollToTab(this.focusedTab ?? this.activeTab);
  }
  handleFocusout() {
    if (this.matches(":focus-within")) {
      return;
    }
    const { activeTab } = this;
    if (activeTab) {
      this.updateFocusableTab(activeTab);
    }
  }
  handleSlotChange() {
    const firstTab = this.tabs[0];
    if (!this.activeTab && firstTab) {
      this.activateTab(firstTab);
    }
    this.scrollToTab(this.activeTab);
  }
}
(() => {
  setupHostAria(Tabs, { focusable: false });
})();
__decorate2([
  n5({ type: Boolean, attribute: "auto-activate" })
], Tabs.prototype, "autoActivate", undefined);
__decorate2([
  i4("slot")
], Tabs.prototype, "slotElement", undefined);
__decorate2([
  l4({ flatten: true })
], Tabs.prototype, "maybeTabs", undefined);

// node_modules/@material/web/tabs/internal/tabs-styles.css.js
var styles6 = i`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}/*# sourceMappingURL=tabs-styles.css.map */
`;

// node_modules/@material/web/tabs/tabs.js
var MdTabs = class MdTabs2 extends Tabs {
};
MdTabs.styles = [styles6];
MdTabs = __decorate2([
  e4("md-tabs")
], MdTabs);

// node_modules/@material/web/tabs/internal/primary-tab.js
class PrimaryTab extends Tab {
  constructor() {
    super(...arguments);
    this.inlineIcon = false;
  }
  getContentClasses() {
    return {
      ...super.getContentClasses(),
      stacked: !this.inlineIcon
    };
  }
}
__decorate2([
  n5({ type: Boolean, attribute: "inline-icon" })
], PrimaryTab.prototype, "inlineIcon", undefined);

// node_modules/@material/web/tabs/internal/primary-tab-styles.css.js
var styles7 = i`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_container-shape: var(--md-primary-tab-container-shape, 0px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var( --md-primary-tab-container-shape-start-start, var(--_container-shape) );--_container-shape-start-end: var( --md-primary-tab-container-shape-start-end, var(--_container-shape) );--_container-shape-end-end: var( --md-primary-tab-container-shape-end-end, var(--_container-shape) );--_container-shape-end-start: var( --md-primary-tab-container-shape-end-start, var(--_container-shape) )}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}/*# sourceMappingURL=primary-tab-styles.css.map */
`;

// node_modules/@material/web/tabs/internal/tab-styles.css.js
var styles8 = i`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;width:100%;position:relative;padding:0 16px;margin:0;z-index:0;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}.button ::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}.button:hover{color:var(--_hover-label-text-color);cursor:pointer}.button:hover ::slotted([slot=icon]){color:var(--_hover-icon-color)}.button:focus{color:var(--_focus-label-text-color)}.button:focus ::slotted([slot=icon]){color:var(--_focus-icon-color)}.button:active{color:var(--_pressed-label-text-color);outline:none}.button:active ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]) .button{color:var(--_active-label-text-color);--md-elevation-level: var(--_container-elevation);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) .button ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]) .button:hover{color:var(--_active-hover-label-text-color)}:host([active]) .button:hover ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]) .button:focus{color:var(--_active-focus-label-text-color)}:host([active]) .button:focus ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]) .button:active{color:var(--_active-pressed-label-text-color)}:host([active]) .button:active ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}/*# sourceMappingURL=tab-styles.css.map */
`;

// node_modules/@material/web/tabs/primary-tab.js
var MdPrimaryTab = class MdPrimaryTab2 extends PrimaryTab {
};
MdPrimaryTab.styles = [styles8, styles7];
MdPrimaryTab = __decorate2([
  e4("md-primary-tab")
], MdPrimaryTab);

// node_modules/mobx/dist/mobx.esm.js
var die = function(error) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;_key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (true) {
    var e8 = typeof error === "string" ? error : errors[error];
    if (typeof e8 === "function")
      e8 = e8.apply(null, args);
    throw new Error("[MobX] " + e8);
  }
  throw new Error(typeof error === "number" ? "[MobX] minified error nr: " + error + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error);
};
var getGlobal = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return mockGlobal;
};
var assertProxies = function() {
  if (!hasProxy) {
    die("`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`");
  }
};
var warnAboutProxyRequirement = function(msg) {
  if (globalState.verifyProxies) {
    die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
  }
};
var getNextId = function() {
  return ++globalState.mobxGuid;
};
var once = function(func) {
  var invoked = false;
  return function() {
    if (invoked) {
      return;
    }
    invoked = true;
    return func.apply(this, arguments);
  };
};
var isFunction2 = function(fn) {
  return typeof fn === "function";
};
var isStringish = function(value) {
  var t5 = typeof value;
  switch (t5) {
    case "string":
    case "symbol":
    case "number":
      return true;
  }
  return false;
};
var isObject = function(value) {
  return value !== null && typeof value === "object";
};
var isPlainObject = function(value) {
  if (!isObject(value)) {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
};
var isGenerator = function(obj) {
  var constructor = obj == null ? undefined : obj.constructor;
  if (!constructor) {
    return false;
  }
  if (constructor.name === "GeneratorFunction" || constructor.displayName === "GeneratorFunction") {
    return true;
  }
  return false;
};
var addHiddenProp = function(object, propName, value) {
  defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value
  });
};
var addHiddenFinalProp = function(object, propName, value) {
  defineProperty(object, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value
  });
};
var createInstanceofPredicate = function(name, theClass) {
  var propName = "isMobX" + name;
  theClass.prototype[propName] = true;
  return function(x2) {
    return isObject(x2) && x2[propName] === true;
  };
};
var isES6Map = function(thing) {
  return thing instanceof Map;
};
var isES6Set = function(thing) {
  return thing instanceof Set;
};
var getPlainObjectKeys = function(object) {
  var keys = Object.keys(object);
  if (!hasGetOwnPropertySymbols) {
    return keys;
  }
  var symbols = Object.getOwnPropertySymbols(object);
  if (!symbols.length) {
    return keys;
  }
  return [].concat(keys, symbols.filter(function(s5) {
    return objectPrototype.propertyIsEnumerable.call(object, s5);
  }));
};
var stringifyKey = function(key) {
  if (typeof key === "string") {
    return key;
  }
  if (typeof key === "symbol") {
    return key.toString();
  }
  return new String(key).toString();
};
var toPrimitive = function(value) {
  return value === null ? null : typeof value === "object" ? "" + value : value;
};
var hasProp = function(target, prop) {
  return objectPrototype.hasOwnProperty.call(target, prop);
};
var _defineProperties = function(target, props) {
  for (var i7 = 0;i7 < props.length; i7++) {
    var descriptor = props[i7];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
};
var _createClass = function(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
};
var _extends = function() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i7 = 1;i7 < arguments.length; i7++) {
      var source = arguments[i7];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
};
var _inheritsLoose = function(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
};
var _setPrototypeOf = function(o10, p2) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o11, p3) {
    o11.__proto__ = p3;
    return o11;
  };
  return _setPrototypeOf(o10, p2);
};
var _assertThisInitialized = function(self2) {
  if (self2 === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
};
var _unsupportedIterableToArray = function(o10, minLen) {
  if (!o10)
    return;
  if (typeof o10 === "string")
    return _arrayLikeToArray(o10, minLen);
  var n8 = Object.prototype.toString.call(o10).slice(8, -1);
  if (n8 === "Object" && o10.constructor)
    n8 = o10.constructor.name;
  if (n8 === "Map" || n8 === "Set")
    return Array.from(o10);
  if (n8 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n8))
    return _arrayLikeToArray(o10, minLen);
};
var _arrayLikeToArray = function(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i7 = 0, arr2 = new Array(len);i7 < len; i7++)
    arr2[i7] = arr[i7];
  return arr2;
};
var _createForOfIteratorHelperLoose = function(o10, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o10[Symbol.iterator] || o10["@@iterator"];
  if (it)
    return (it = it.call(o10)).next.bind(it);
  if (Array.isArray(o10) || (it = _unsupportedIterableToArray(o10)) || allowArrayLike && o10 && typeof o10.length === "number") {
    if (it)
      o10 = it;
    var i7 = 0;
    return function() {
      if (i7 >= o10.length)
        return {
          done: true
        };
      return {
        done: false,
        value: o10[i7++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
};
var _toPrimitive = function(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
};
var _toPropertyKey = function(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
};
var createDecoratorAnnotation = function(annotation) {
  function decorator(target, property4) {
    storeAnnotation(target, property4, annotation);
  }
  return Object.assign(decorator, annotation);
};
var storeAnnotation = function(prototype, key, annotation) {
  if (!hasProp(prototype, storedAnnotationsSymbol)) {
    addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
  }
  if (isOverride(annotation) && !hasProp(prototype[storedAnnotationsSymbol], key)) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    die("'" + fieldName + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  assertNotDecorated(prototype, annotation, key);
  if (!isOverride(annotation)) {
    prototype[storedAnnotationsSymbol][key] = annotation;
  }
};
var assertNotDecorated = function(prototype, annotation, key) {
  if (!isOverride(annotation) && hasProp(prototype[storedAnnotationsSymbol], key)) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.\nRe-decorating fields is not allowed.\nUse '@override' decorator for methods overridden by subclass."));
  }
};
var createAtom = function(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
  if (onBecomeObservedHandler === undefined) {
    onBecomeObservedHandler = noop;
  }
  if (onBecomeUnobservedHandler === undefined) {
    onBecomeUnobservedHandler = noop;
  }
  var atom = new Atom(name);
  if (onBecomeObservedHandler !== noop) {
    onBecomeObserved(atom, onBecomeObservedHandler);
  }
  if (onBecomeUnobservedHandler !== noop) {
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
  }
  return atom;
};
var identityComparer = function(a3, b2) {
  return a3 === b2;
};
var structuralComparer = function(a3, b2) {
  return deepEqual(a3, b2);
};
var shallowComparer = function(a3, b2) {
  return deepEqual(a3, b2, 1);
};
var defaultComparer = function(a3, b2) {
  if (Object.is) {
    return Object.is(a3, b2);
  }
  return a3 === b2 ? a3 !== 0 || 1 / a3 === 1 / b2 : a3 !== a3 && b2 !== b2;
};
var deepEnhancer = function(v2, _2, name) {
  if (isObservable(v2)) {
    return v2;
  }
  if (Array.isArray(v2)) {
    return observable.array(v2, {
      name
    });
  }
  if (isPlainObject(v2)) {
    return observable.object(v2, undefined, {
      name
    });
  }
  if (isES6Map(v2)) {
    return observable.map(v2, {
      name
    });
  }
  if (isES6Set(v2)) {
    return observable.set(v2, {
      name
    });
  }
  if (typeof v2 === "function" && !isAction(v2) && !isFlow(v2)) {
    if (isGenerator(v2)) {
      return flow(v2);
    } else {
      return autoAction(name, v2);
    }
  }
  return v2;
};
var shallowEnhancer = function(v2, _2, name) {
  if (v2 === undefined || v2 === null) {
    return v2;
  }
  if (isObservableObject(v2) || isObservableArray(v2) || isObservableMap(v2) || isObservableSet(v2)) {
    return v2;
  }
  if (Array.isArray(v2)) {
    return observable.array(v2, {
      name,
      deep: false
    });
  }
  if (isPlainObject(v2)) {
    return observable.object(v2, undefined, {
      name,
      deep: false
    });
  }
  if (isES6Map(v2)) {
    return observable.map(v2, {
      name,
      deep: false
    });
  }
  if (isES6Set(v2)) {
    return observable.set(v2, {
      name,
      deep: false
    });
  }
  if (true) {
    die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
};
var referenceEnhancer = function(newValue) {
  return newValue;
};
var refStructEnhancer = function(v2, oldValue) {
  if (isObservable(v2)) {
    die("observable.struct should not be used with observable values");
  }
  if (deepEqual(v2, oldValue)) {
    return oldValue;
  }
  return v2;
};
var isOverride = function(annotation) {
  return annotation.annotationType_ === OVERRIDE;
};
var createActionAnnotation = function(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$1,
    extend_: extend_$1
  };
};
var make_$1 = function(adm, key, descriptor, source) {
  var _this$options_;
  if ((_this$options_ = this.options_) != null && _this$options_.bound) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
  }
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
  }
  if (isAction(descriptor.value)) {
    return 1;
  }
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
  defineProperty(source, key, actionDescriptor);
  return 2;
};
var extend_$1 = function(adm, key, descriptor, proxyTrap) {
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
  return adm.defineProperty_(key, actionDescriptor, proxyTrap);
};
var assertActionDescriptor = function(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (!isFunction2(value)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
  }
};
var createActionDescriptor = function(adm, annotation, key, descriptor, safeDescriptors) {
  var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
  if (safeDescriptors === undefined) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertActionDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return {
    value: createAction((_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? undefined : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(), value, (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? undefined : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false, (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : undefined),
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    enumerable: false,
    writable: safeDescriptors ? false : true
  };
};
var createFlowAnnotation = function(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$2,
    extend_: extend_$2
  };
};
var make_$2 = function(adm, key, descriptor, source) {
  var _this$options_;
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 : 2;
  }
  if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
    if (this.extend_(adm, key, descriptor, false) === null) {
      return 0;
    }
  }
  if (isFlow(descriptor.value)) {
    return 1;
  }
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
  defineProperty(source, key, flowDescriptor);
  return 2;
};
var extend_$2 = function(adm, key, descriptor, proxyTrap) {
  var _this$options_2;
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? undefined : _this$options_2.bound);
  return adm.defineProperty_(key, flowDescriptor, proxyTrap);
};
var assertFlowDescriptor = function(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (!isFunction2(value)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
  }
};
var createFlowDescriptor = function(adm, annotation, key, descriptor, bound, safeDescriptors) {
  if (safeDescriptors === undefined) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertFlowDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if (!isFlow(value)) {
    value = flow(value);
  }
  if (bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    value.isMobXFlow = true;
  }
  return {
    value,
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    enumerable: false,
    writable: safeDescriptors ? false : true
  };
};
var createComputedAnnotation = function(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$3,
    extend_: extend_$3
  };
};
var make_$3 = function(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
};
var extend_$3 = function(adm, key, descriptor, proxyTrap) {
  assertComputedDescriptor(adm, this, key, descriptor);
  return adm.defineComputedProperty_(key, _extends({}, this.options_, {
    get: descriptor.get,
    set: descriptor.set
  }), proxyTrap);
};
var assertComputedDescriptor = function(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var get = _ref2.get;
  if (!get) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
  }
};
var createObservableAnnotation = function(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$4,
    extend_: extend_$4
  };
};
var make_$4 = function(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 : 1;
};
var extend_$4 = function(adm, key, descriptor, proxyTrap) {
  var _this$options_$enhanc, _this$options_;
  assertObservableDescriptor(adm, this, key, descriptor);
  return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? undefined : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
};
var assertObservableDescriptor = function(adm, _ref, key, descriptor) {
  var annotationType_ = _ref.annotationType_;
  if (!("value" in descriptor)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
  }
};
var createAutoAnnotation = function(options) {
  return {
    annotationType_: AUTO,
    options_: options,
    make_: make_$5,
    extend_: extend_$5
  };
};
var make_$5 = function(adm, key, descriptor, source) {
  var _this$options_3, _this$options_4;
  if (descriptor.get) {
    return computed.make_(adm, key, descriptor, source);
  }
  if (descriptor.set) {
    var set = createAction(key.toString(), descriptor.set);
    if (source === adm.target_) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set
      }) === null ? 0 : 2;
    }
    defineProperty(source, key, {
      configurable: true,
      set
    });
    return 2;
  }
  if (source !== adm.target_ && typeof descriptor.value === "function") {
    var _this$options_2;
    if (isGenerator(descriptor.value)) {
      var _this$options_;
      var flowAnnotation = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
      return flowAnnotation.make_(adm, key, descriptor, source);
    }
    var actionAnnotation = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
    return actionAnnotation.make_(adm, key, descriptor, source);
  }
  var observableAnnotation = ((_this$options_3 = this.options_) == null ? undefined : _this$options_3.deep) === false ? observable.ref : observable;
  if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
    var _adm$proxy_;
    descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return observableAnnotation.make_(adm, key, descriptor, source);
};
var extend_$5 = function(adm, key, descriptor, proxyTrap) {
  var _this$options_5, _this$options_6;
  if (descriptor.get) {
    return computed.extend_(adm, key, descriptor, proxyTrap);
  }
  if (descriptor.set) {
    return adm.defineProperty_(key, {
      configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
      set: createAction(key.toString(), descriptor.set)
    }, proxyTrap);
  }
  if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
    var _adm$proxy_2;
    descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
  }
  var observableAnnotation = ((_this$options_6 = this.options_) == null ? undefined : _this$options_6.deep) === false ? observable.ref : observable;
  return observableAnnotation.extend_(adm, key, descriptor, proxyTrap);
};
var asCreateObservableOptions = function(thing) {
  return thing || defaultCreateObservableOptions;
};
var getEnhancerFromOptions = function(options) {
  return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
};
var getAnnotationFromOptions = function(options) {
  var _options$defaultDecor;
  return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : undefined;
};
var getEnhancerFromAnnotation = function(annotation) {
  var _annotation$options_$, _annotation$options_;
  return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? undefined : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
};
var createObservable = function(v2, arg2, arg3) {
  if (isStringish(arg2)) {
    storeAnnotation(v2, arg2, observableAnnotation);
    return;
  }
  if (isObservable(v2)) {
    return v2;
  }
  if (isPlainObject(v2)) {
    return observable.object(v2, arg2, arg3);
  }
  if (Array.isArray(v2)) {
    return observable.array(v2, arg2);
  }
  if (isES6Map(v2)) {
    return observable.map(v2, arg2);
  }
  if (isES6Set(v2)) {
    return observable.set(v2, arg2);
  }
  if (typeof v2 === "object" && v2 !== null) {
    return v2;
  }
  return observable.box(v2, arg2);
};
var createAction = function(actionName, fn, autoAction, ref) {
  if (autoAction === undefined) {
    autoAction = false;
  }
  if (true) {
    if (!isFunction2(fn)) {
      die("`action` can only be invoked on functions");
    }
    if (typeof actionName !== "string" || !actionName) {
      die("actions should have valid names, got: '" + actionName + "'");
    }
  }
  function res() {
    return executeAction(actionName, autoAction, fn, ref || this, arguments);
  }
  res.isMobxAction = true;
  if (isFunctionNameConfigurable) {
    tmpNameDescriptor.value = actionName;
    defineProperty(res, "name", tmpNameDescriptor);
  }
  return res;
};
var executeAction = function(actionName, canRunAsDerivation, fn, scope, args) {
  var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);
  try {
    return fn.apply(scope, args);
  } catch (err) {
    runInfo.error_ = err;
    throw err;
  } finally {
    _endAction(runInfo);
  }
};
var _startAction = function(actionName, canRunAsDerivation, scope, args) {
  var notifySpy_ = isSpyEnabled() && !!actionName;
  var startTime_ = 0;
  if (notifySpy_) {
    startTime_ = Date.now();
    var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
    spyReportStart({
      type: ACTION,
      name: actionName,
      object: scope,
      arguments: flattenedArgs
    });
  }
  var prevDerivation_ = globalState.trackingDerivation;
  var runAsAction = !canRunAsDerivation || !prevDerivation_;
  startBatch();
  var prevAllowStateChanges_ = globalState.allowStateChanges;
  if (runAsAction) {
    untrackedStart();
    prevAllowStateChanges_ = allowStateChangesStart(true);
  }
  var prevAllowStateReads_ = allowStateReadsStart(true);
  var runInfo = {
    runAsAction_: runAsAction,
    prevDerivation_,
    prevAllowStateChanges_,
    prevAllowStateReads_,
    notifySpy_,
    startTime_,
    actionId_: nextActionId++,
    parentActionId_: currentActionId
  };
  currentActionId = runInfo.actionId_;
  return runInfo;
};
var _endAction = function(runInfo) {
  if (currentActionId !== runInfo.actionId_) {
    die(30);
  }
  currentActionId = runInfo.parentActionId_;
  if (runInfo.error_ !== undefined) {
    globalState.suppressReactionErrors = true;
  }
  allowStateChangesEnd(runInfo.prevAllowStateChanges_);
  allowStateReadsEnd(runInfo.prevAllowStateReads_);
  endBatch();
  if (runInfo.runAsAction_) {
    untrackedEnd(runInfo.prevDerivation_);
  }
  if (runInfo.notifySpy_) {
    spyReportEnd({
      time: Date.now() - runInfo.startTime_
    });
  }
  globalState.suppressReactionErrors = false;
};
var allowStateChangesStart = function(allowStateChanges) {
  var prev = globalState.allowStateChanges;
  globalState.allowStateChanges = allowStateChanges;
  return prev;
};
var allowStateChangesEnd = function(prev) {
  globalState.allowStateChanges = prev;
};
var isCaughtException = function(e8) {
  return e8 instanceof CaughtException;
};
var shouldCompute = function(derivation) {
  switch (derivation.dependenciesState_) {
    case IDerivationState_.UP_TO_DATE_:
      return false;
    case IDerivationState_.NOT_TRACKING_:
    case IDerivationState_.STALE_:
      return true;
    case IDerivationState_.POSSIBLY_STALE_: {
      var prevAllowStateReads = allowStateReadsStart(true);
      var prevUntracked = untrackedStart();
      var obs = derivation.observing_, l6 = obs.length;
      for (var i7 = 0;i7 < l6; i7++) {
        var obj = obs[i7];
        if (isComputedValue(obj)) {
          if (globalState.disableErrorBoundaries) {
            obj.get();
          } else {
            try {
              obj.get();
            } catch (e8) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
          if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
            untrackedEnd(prevUntracked);
            allowStateReadsEnd(prevAllowStateReads);
            return true;
          }
        }
      }
      changeDependenciesStateTo0(derivation);
      untrackedEnd(prevUntracked);
      allowStateReadsEnd(prevAllowStateReads);
      return false;
    }
  }
};
var checkIfStateModificationsAreAllowed = function(atom) {
  if (false) {
  }
  var hasObservers = atom.observers_.size > 0;
  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) {
    console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
  }
};
var checkIfStateReadsAreAllowed = function(observable) {
  if (!globalState.allowStateReads && globalState.observableRequiresReaction) {
    console.warn("[mobx] Observable '" + observable.name_ + "' being read outside a reactive context.");
  }
};
var trackDerivedFunction = function(derivation, f2, context) {
  var prevAllowStateReads = allowStateReadsStart(true);
  changeDependenciesStateTo0(derivation);
  derivation.newObserving_ = new Array(derivation.observing_.length + 100);
  derivation.unboundDepsCount_ = 0;
  derivation.runId_ = ++globalState.runId;
  var prevTracking = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;
  globalState.inBatch++;
  var result;
  if (globalState.disableErrorBoundaries === true) {
    result = f2.call(context);
  } else {
    try {
      result = f2.call(context);
    } catch (e8) {
      result = new CaughtException(e8);
    }
  }
  globalState.inBatch--;
  globalState.trackingDerivation = prevTracking;
  bindDependencies(derivation);
  warnAboutDerivationWithoutDependencies(derivation);
  allowStateReadsEnd(prevAllowStateReads);
  return result;
};
var warnAboutDerivationWithoutDependencies = function(derivation) {
  if (false) {
  }
  if (derivation.observing_.length !== 0) {
    return;
  }
  if (typeof derivation.requiresObservable_ === "boolean" ? derivation.requiresObservable_ : globalState.reactionRequiresObservable) {
    console.warn("[mobx] Derivation '" + derivation.name_ + "' is created/updated without reading any observable value.");
  }
};
var bindDependencies = function(derivation) {
  var prevObserving = derivation.observing_;
  var observing = derivation.observing_ = derivation.newObserving_;
  var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
  var i0 = 0, l6 = derivation.unboundDepsCount_;
  for (var i7 = 0;i7 < l6; i7++) {
    var dep = observing[i7];
    if (dep.diffValue_ === 0) {
      dep.diffValue_ = 1;
      if (i0 !== i7) {
        observing[i0] = dep;
      }
      i0++;
    }
    if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState_;
    }
  }
  observing.length = i0;
  derivation.newObserving_ = null;
  l6 = prevObserving.length;
  while (l6--) {
    var _dep = prevObserving[l6];
    if (_dep.diffValue_ === 0) {
      removeObserver(_dep, derivation);
    }
    _dep.diffValue_ = 0;
  }
  while (i0--) {
    var _dep2 = observing[i0];
    if (_dep2.diffValue_ === 1) {
      _dep2.diffValue_ = 0;
      addObserver(_dep2, derivation);
    }
  }
  if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
    derivation.dependenciesState_ = lowestNewObservingDerivationState;
    derivation.onBecomeStale_();
  }
};
var clearObserving = function(derivation) {
  var obs = derivation.observing_;
  derivation.observing_ = [];
  var i7 = obs.length;
  while (i7--) {
    removeObserver(obs[i7], derivation);
  }
  derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
};
var untracked = function(action) {
  var prev = untrackedStart();
  try {
    return action();
  } finally {
    untrackedEnd(prev);
  }
};
var untrackedStart = function() {
  var prev = globalState.trackingDerivation;
  globalState.trackingDerivation = null;
  return prev;
};
var untrackedEnd = function(prev) {
  globalState.trackingDerivation = prev;
};
var allowStateReadsStart = function(allowStateReads) {
  var prev = globalState.allowStateReads;
  globalState.allowStateReads = allowStateReads;
  return prev;
};
var allowStateReadsEnd = function(prev) {
  globalState.allowStateReads = prev;
};
var changeDependenciesStateTo0 = function(derivation) {
  if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
    return;
  }
  derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
  var obs = derivation.observing_;
  var i7 = obs.length;
  while (i7--) {
    obs[i7].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
  }
};
var addObserver = function(observable, node) {
  observable.observers_.add(node);
  if (observable.lowestObserverState_ > node.dependenciesState_) {
    observable.lowestObserverState_ = node.dependenciesState_;
  }
};
var removeObserver = function(observable, node) {
  observable.observers_["delete"](node);
  if (observable.observers_.size === 0) {
    queueForUnobservation(observable);
  }
};
var queueForUnobservation = function(observable) {
  if (observable.isPendingUnobservation_ === false) {
    observable.isPendingUnobservation_ = true;
    globalState.pendingUnobservations.push(observable);
  }
};
var startBatch = function() {
  if (globalState.inBatch === 0) {
    globalState.batchId = globalState.batchId < Number.MAX_SAFE_INTEGER ? globalState.batchId + 1 : Number.MIN_SAFE_INTEGER;
  }
  globalState.inBatch++;
};
var endBatch = function() {
  if (--globalState.inBatch === 0) {
    runReactions();
    var list = globalState.pendingUnobservations;
    for (var i7 = 0;i7 < list.length; i7++) {
      var observable = list[i7];
      observable.isPendingUnobservation_ = false;
      if (observable.observers_.size === 0) {
        if (observable.isBeingObserved_) {
          observable.isBeingObserved_ = false;
          observable.onBUO();
        }
        if (observable instanceof ComputedValue) {
          observable.suspend_();
        }
      }
    }
    globalState.pendingUnobservations = [];
  }
};
var reportObserved = function(observable) {
  checkIfStateReadsAreAllowed(observable);
  var derivation = globalState.trackingDerivation;
  if (derivation !== null) {
    if (derivation.runId_ !== observable.lastAccessedBy_) {
      observable.lastAccessedBy_ = derivation.runId_;
      derivation.newObserving_[derivation.unboundDepsCount_++] = observable;
      if (!observable.isBeingObserved_ && globalState.trackingContext) {
        observable.isBeingObserved_ = true;
        observable.onBO();
      }
    }
    return observable.isBeingObserved_;
  } else if (observable.observers_.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable);
  }
  return false;
};
var propagateChanged = function(observable) {
  if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable.lowestObserverState_ = IDerivationState_.STALE_;
  observable.observers_.forEach(function(d3) {
    if (d3.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      if (d3.isTracing_ !== TraceMode.NONE) {
        logTraceInfo(d3, observable);
      }
      d3.onBecomeStale_();
    }
    d3.dependenciesState_ = IDerivationState_.STALE_;
  });
};
var propagateChangeConfirmed = function(observable) {
  if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable.lowestObserverState_ = IDerivationState_.STALE_;
  observable.observers_.forEach(function(d3) {
    if (d3.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
      d3.dependenciesState_ = IDerivationState_.STALE_;
      if (d3.isTracing_ !== TraceMode.NONE) {
        logTraceInfo(d3, observable);
      }
    } else if (d3.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      observable.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  });
};
var propagateMaybeChanged = function(observable) {
  if (observable.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
    return;
  }
  observable.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
  observable.observers_.forEach(function(d3) {
    if (d3.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      d3.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
      d3.onBecomeStale_();
    }
  });
};
var logTraceInfo = function(derivation, observable) {
  console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable.name_ + "'");
  if (derivation.isTracing_ === TraceMode.BREAK) {
    var lines = [];
    printDepTree(getDependencyTree(derivation), lines, 1);
    new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
  }
};
var printDepTree = function(tree, lines, depth) {
  if (lines.length >= 1000) {
    lines.push("(and many more)");
    return;
  }
  lines.push("" + "\t".repeat(depth - 1) + tree.name);
  if (tree.dependencies) {
    tree.dependencies.forEach(function(child) {
      return printDepTree(child, lines, depth + 1);
    });
  }
};
var runReactions = function() {
  if (globalState.inBatch > 0 || globalState.isRunningReactions) {
    return;
  }
  reactionScheduler(runReactionsHelper);
};
var runReactionsHelper = function() {
  globalState.isRunningReactions = true;
  var allReactions = globalState.pendingReactions;
  var iterations = 0;
  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
      allReactions.splice(0);
    }
    var remainingReactions = allReactions.splice(0);
    for (var i7 = 0, l6 = remainingReactions.length;i7 < l6; i7++) {
      remainingReactions[i7].runReaction_();
    }
  }
  globalState.isRunningReactions = false;
};
var isSpyEnabled = function() {
  return !!globalState.spyListeners.length;
};
var spyReport = function(event) {
  if (false) {
  }
  if (!globalState.spyListeners.length) {
    return;
  }
  var listeners = globalState.spyListeners;
  for (var i7 = 0, l6 = listeners.length;i7 < l6; i7++) {
    listeners[i7](event);
  }
};
var spyReportStart = function(event) {
  if (false) {
  }
  var change = _extends({}, event, {
    spyReportStart: true
  });
  spyReport(change);
};
var spyReportEnd = function(change) {
  if (false) {
  }
  if (change) {
    spyReport(_extends({}, change, {
      type: "report-end",
      spyReportEnd: true
    }));
  } else {
    spyReport(END_EVENT);
  }
};
var spy = function(listener) {
  if (false) {
  } else {
    globalState.spyListeners.push(listener);
    return once(function() {
      globalState.spyListeners = globalState.spyListeners.filter(function(l6) {
        return l6 !== listener;
      });
    });
  }
};
var createActionFactory = function(autoAction) {
  var res = function action(arg1, arg2) {
    if (isFunction2(arg1)) {
      return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction);
    }
    if (isFunction2(arg2)) {
      return createAction(arg1, arg2, autoAction);
    }
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, autoAction ? autoActionAnnotation : actionAnnotation);
    }
    if (isStringish(arg1)) {
      return createDecoratorAnnotation(createActionAnnotation(autoAction ? AUTOACTION : ACTION, {
        name: arg1,
        autoAction
      }));
    }
    if (true) {
      die("Invalid arguments for `action`");
    }
  };
  return res;
};
var runInAction = function(fn) {
  return executeAction(fn.name || DEFAULT_ACTION_NAME, false, fn, this, undefined);
};
var isAction = function(thing) {
  return isFunction2(thing) && thing.isMobxAction === true;
};
var autorun = function(view, opts) {
  var _opts$name, _opts, _opts2, _opts2$signal, _opts3;
  if (opts === undefined) {
    opts = EMPTY_OBJECT;
  }
  if (true) {
    if (!isFunction2(view)) {
      die("Autorun expects a function as first argument");
    }
    if (isAction(view)) {
      die("Autorun does not accept actions since actions are untrackable");
    }
  }
  var name = (_opts$name = (_opts = opts) == null ? undefined : _opts.name) != null ? _opts$name : view.name || "Autorun@" + getNextId();
  var runSync = !opts.scheduler && !opts.delay;
  var reaction;
  if (runSync) {
    reaction = new Reaction(name, function() {
      this.track(reactionRunner);
    }, opts.onError, opts.requiresObservable);
  } else {
    var scheduler = createSchedulerFromOptions(opts);
    var isScheduled = false;
    reaction = new Reaction(name, function() {
      if (!isScheduled) {
        isScheduled = true;
        scheduler(function() {
          isScheduled = false;
          if (!reaction.isDisposed_) {
            reaction.track(reactionRunner);
          }
        });
      }
    }, opts.onError, opts.requiresObservable);
  }
  function reactionRunner() {
    view(reaction);
  }
  if (!((_opts2 = opts) != null && (_opts2$signal = _opts2.signal) != null && _opts2$signal.aborted)) {
    reaction.schedule_();
  }
  return reaction.getDisposer_((_opts3 = opts) == null ? undefined : _opts3.signal);
};
var createSchedulerFromOptions = function(opts) {
  return opts.scheduler ? opts.scheduler : opts.delay ? function(f2) {
    return setTimeout(f2, opts.delay);
  } : run;
};
var onBecomeObserved = function(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
};
var onBecomeUnobserved = function(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
};
var interceptHook = function(hook, thing, arg2, arg3) {
  var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
  var cb = isFunction2(arg3) ? arg3 : arg2;
  var listenersKey = hook + "L";
  if (atom[listenersKey]) {
    atom[listenersKey].add(cb);
  } else {
    atom[listenersKey] = new Set([cb]);
  }
  return function() {
    var hookListeners = atom[listenersKey];
    if (hookListeners) {
      hookListeners["delete"](cb);
      if (hookListeners.size === 0) {
        delete atom[listenersKey];
      }
    }
  };
};
var extendObservable = function(target, properties, annotations, options) {
  if (true) {
    if (arguments.length > 4) {
      die("'extendObservable' expected 2-4 arguments");
    }
    if (typeof target !== "object") {
      die("'extendObservable' expects an object as first argument");
    }
    if (isObservableMap(target)) {
      die("'extendObservable' should not be used on maps, use map.merge instead");
    }
    if (!isPlainObject(properties)) {
      die("'extendObservable' only accepts plain objects as second argument");
    }
    if (isObservable(properties) || isObservable(annotations)) {
      die("Extending an object with another observable (object) is not supported");
    }
  }
  var descriptors = getOwnPropertyDescriptors(properties);
  initObservable(function() {
    var adm = asObservableObject(target, options)[$mobx];
    ownKeys(descriptors).forEach(function(key) {
      adm.extend_(key, descriptors[key], !annotations ? true : (key in annotations) ? annotations[key] : true);
    });
  });
  return target;
};
var getDependencyTree = function(thing, property4) {
  return nodeToDependencyTree(getAtom(thing, property4));
};
var nodeToDependencyTree = function(node) {
  var result = {
    name: node.name_
  };
  if (node.observing_ && node.observing_.length > 0) {
    result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
  }
  return result;
};
var unique = function(list) {
  return Array.from(new Set(list));
};
var FlowCancellationError = function() {
  this.message = "FLOW_CANCELLED";
};
var cancelPromise = function(promise) {
  if (isFunction2(promise.cancel)) {
    promise.cancel();
  }
};
var isFlow = function(fn) {
  return (fn == null ? undefined : fn.isMobXFlow) === true;
};
var _isObservable = function(value, property4) {
  if (!value) {
    return false;
  }
  if (property4 !== undefined) {
    if (isObservableMap(value) || isObservableArray(value)) {
      return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
    }
    if (isObservableObject(value)) {
      return value[$mobx].values_.has(property4);
    }
    return false;
  }
  return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
};
var isObservable = function(value) {
  if (arguments.length !== 1) {
    die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  }
  return _isObservable(value);
};
var trace = function() {
  if (false) {
  }
  var enterBreakPoint = false;
  for (var _len = arguments.length, args = new Array(_len), _key = 0;_key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (typeof args[args.length - 1] === "boolean") {
    enterBreakPoint = args.pop();
  }
  var derivation = getAtomFromArgs(args);
  if (!derivation) {
    return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
  }
  if (derivation.isTracing_ === TraceMode.NONE) {
    console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
  }
  derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
};
var getAtomFromArgs = function(args) {
  switch (args.length) {
    case 0:
      return globalState.trackingDerivation;
    case 1:
      return getAtom(args[0]);
    case 2:
      return getAtom(args[0], args[1]);
  }
};
var transaction = function(action, thisArg) {
  if (thisArg === undefined) {
    thisArg = undefined;
  }
  startBatch();
  try {
    return action.apply(thisArg);
  } finally {
    endBatch();
  }
};
var getAdm = function(target) {
  return target[$mobx];
};
var asDynamicObservableObject = function(target, options) {
  var _target$$mobx, _target$$mobx$proxy_;
  assertProxies();
  target = asObservableObject(target, options);
  return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
};
var hasInterceptors = function(interceptable) {
  return interceptable.interceptors_ !== undefined && interceptable.interceptors_.length > 0;
};
var registerInterceptor = function(interceptable, handler) {
  var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
  interceptors.push(handler);
  return once(function() {
    var idx = interceptors.indexOf(handler);
    if (idx !== -1) {
      interceptors.splice(idx, 1);
    }
  });
};
var interceptChange = function(interceptable, change) {
  var prevU = untrackedStart();
  try {
    var interceptors = [].concat(interceptable.interceptors_ || []);
    for (var i7 = 0, l6 = interceptors.length;i7 < l6; i7++) {
      change = interceptors[i7](change);
      if (change && !change.type) {
        die(14);
      }
      if (!change) {
        break;
      }
    }
    return change;
  } finally {
    untrackedEnd(prevU);
  }
};
var hasListeners = function(listenable) {
  return listenable.changeListeners_ !== undefined && listenable.changeListeners_.length > 0;
};
var registerListener = function(listenable, handler) {
  var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
  listeners.push(handler);
  return once(function() {
    var idx = listeners.indexOf(handler);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  });
};
var notifyListeners = function(listenable, change) {
  var prevU = untrackedStart();
  var listeners = listenable.changeListeners_;
  if (!listeners) {
    return;
  }
  listeners = listeners.slice();
  for (var i7 = 0, l6 = listeners.length;i7 < l6; i7++) {
    listeners[i7](change);
  }
  untrackedEnd(prevU);
};
var makeAutoObservable = function(target, overrides, options) {
  if (true) {
    if (!isPlainObject(target) && !isPlainObject(Object.getPrototypeOf(target))) {
      die("'makeAutoObservable' can only be used for classes that don't have a superclass");
    }
    if (isObservableObject(target)) {
      die("makeAutoObservable can only be used on objects not already made observable");
    }
  }
  if (isPlainObject(target)) {
    return extendObservable(target, target, overrides, options);
  }
  initObservable(function() {
    var adm = asObservableObject(target, options)[$mobx];
    if (!target[keysSymbol]) {
      var proto = Object.getPrototypeOf(target);
      var keys = new Set([].concat(ownKeys(target), ownKeys(proto)));
      keys["delete"]("constructor");
      keys["delete"]($mobx);
      addHiddenProp(proto, keysSymbol, keys);
    }
    target[keysSymbol].forEach(function(key) {
      return adm.make_(key, !overrides ? true : (key in overrides) ? overrides[key] : true);
    });
  });
  return target;
};
var createObservableArray = function(initialValues, enhancer, name, owned) {
  if (name === undefined) {
    name = "ObservableArray@" + getNextId();
  }
  if (owned === undefined) {
    owned = false;
  }
  assertProxies();
  return initObservable(function() {
    var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
    addHiddenFinalProp(adm.values_, $mobx, adm);
    var proxy = new Proxy(adm.values_, arrayTraps);
    adm.proxy_ = proxy;
    if (initialValues && initialValues.length) {
      adm.spliceWithArray_(0, 0, initialValues);
    }
    return proxy;
  });
};
var addArrayExtension = function(funcName, funcFactory) {
  if (typeof Array.prototype[funcName] === "function") {
    arrayExtensions[funcName] = funcFactory(funcName);
  }
};
var simpleFunc = function(funcName) {
  return function() {
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
};
var mapLikeFunc = function(funcName) {
  return function(callback, thisArg) {
    var _this2 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName](function(element, index) {
      return callback.call(thisArg, element, index, _this2);
    });
  };
};
var reduceLikeFunc = function(funcName) {
  return function() {
    var _this3 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    var callback = arguments[0];
    arguments[0] = function(accumulator, currentValue, index) {
      return callback(accumulator, currentValue, index, _this3);
    };
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
};
var isObservableArray = function(thing) {
  return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
};
var convertToMap = function(dataStructure) {
  if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
    return dataStructure;
  } else if (Array.isArray(dataStructure)) {
    return new Map(dataStructure);
  } else if (isPlainObject(dataStructure)) {
    var map = new Map;
    for (var key in dataStructure) {
      map.set(key, dataStructure[key]);
    }
    return map;
  } else {
    return die(21, dataStructure);
  }
};
var asObservableObject = function(target, options) {
  var _options$name;
  if (options && isObservableObject(target)) {
    die("Options can't be provided for already observable objects.");
  }
  if (hasProp(target, $mobx)) {
    if (!(getAdministration(target) instanceof ObservableObjectAdministration)) {
      die("Cannot convert '" + getDebugName(target) + "' into observable object:\nThe target is already observable of different type.\nExtending builtins is not supported.");
    }
    return target;
  }
  if (!Object.isExtensible(target)) {
    die("Cannot make the designated object observable; it is not extensible");
  }
  var name = (_options$name = options == null ? undefined : options.name) != null ? _options$name : (isPlainObject(target) ? "ObservableObject" : target.constructor.name) + "@" + getNextId();
  var adm = new ObservableObjectAdministration(target, new Map, String(name), getAnnotationFromOptions(options));
  addHiddenProp(target, $mobx, adm);
  return target;
};
var getCachedObservablePropDescriptor = function(key) {
  return descriptorCache[key] || (descriptorCache[key] = {
    get: function get() {
      return this[$mobx].getObservablePropValue_(key);
    },
    set: function set(value) {
      return this[$mobx].setObservablePropValue_(key, value);
    }
  });
};
var isObservableObject = function(thing) {
  if (isObject(thing)) {
    return isObservableObjectAdministration(thing[$mobx]);
  }
  return false;
};
var recordAnnotationApplied = function(adm, annotation, key) {
  var _adm$target_$storedAn;
  if (true) {
    adm.appliedAnnotations_[key] = annotation;
  }
  (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null || delete _adm$target_$storedAn[key];
};
var assertAnnotable = function(adm, annotation, key) {
  if (!isAnnotation(annotation)) {
    die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
  }
  if (!isOverride(annotation) && hasProp(adm.appliedAnnotations_, key)) {
    var fieldName = adm.name_ + "." + key.toString();
    var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.\nRe-annotating fields is not allowed.\nUse 'override' annotation for methods overridden by subclass."));
  }
};
var inherit = function(ctor, proto) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ctor.prototype, proto);
  } else if (ctor.prototype.__proto__ !== undefined) {
    ctor.prototype.__proto__ = proto;
  } else {
    ctor.prototype = proto;
  }
};
var createArrayEntryDescriptor = function(index) {
  return {
    enumerable: false,
    configurable: true,
    get: function get() {
      return this[$mobx].get_(index);
    },
    set: function set(value) {
      this[$mobx].set_(index, value);
    }
  };
};
var createArrayBufferItem = function(index) {
  defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
};
var reserveArrayBuffer = function(max) {
  if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE;index < max + 100; index++) {
      createArrayBufferItem(index);
    }
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
  }
};
var createLegacyArray = function(initialValues, enhancer, name) {
  return new LegacyObservableArray(initialValues, enhancer, name);
};
var getAtom = function(thing, property4) {
  if (typeof thing === "object" && thing !== null) {
    if (isObservableArray(thing)) {
      if (property4 !== undefined) {
        die(23);
      }
      return thing[$mobx].atom_;
    }
    if (isObservableSet(thing)) {
      return thing.atom_;
    }
    if (isObservableMap(thing)) {
      if (property4 === undefined) {
        return thing.keysAtom_;
      }
      var observable = thing.data_.get(property4) || thing.hasMap_.get(property4);
      if (!observable) {
        die(25, property4, getDebugName(thing));
      }
      return observable;
    }
    if (isObservableObject(thing)) {
      if (!property4) {
        return die(26);
      }
      var _observable = thing[$mobx].values_.get(property4);
      if (!_observable) {
        die(27, property4, getDebugName(thing));
      }
      return _observable;
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
  } else if (isFunction2(thing)) {
    if (isReaction(thing[$mobx])) {
      return thing[$mobx];
    }
  }
  die(28);
};
var getAdministration = function(thing, property4) {
  if (!thing) {
    die(29);
  }
  if (property4 !== undefined) {
    return getAdministration(getAtom(thing, property4));
  }
  if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
    return thing;
  }
  if (isObservableMap(thing) || isObservableSet(thing)) {
    return thing;
  }
  if (thing[$mobx]) {
    return thing[$mobx];
  }
  die(24, thing);
};
var getDebugName = function(thing, property4) {
  var named;
  if (property4 !== undefined) {
    named = getAtom(thing, property4);
  } else if (isAction(thing)) {
    return thing.name;
  } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
    named = getAdministration(thing);
  } else {
    named = getAtom(thing);
  }
  return named.name_;
};
var initObservable = function(cb) {
  var derivation = untrackedStart();
  var allowStateChanges = allowStateChangesStart(true);
  startBatch();
  try {
    return cb();
  } finally {
    endBatch();
    allowStateChangesEnd(allowStateChanges);
    untrackedEnd(derivation);
  }
};
var deepEqual = function(a3, b2, depth) {
  if (depth === undefined) {
    depth = -1;
  }
  return eq(a3, b2, depth);
};
var eq = function(a3, b2, depth, aStack, bStack) {
  if (a3 === b2) {
    return a3 !== 0 || 1 / a3 === 1 / b2;
  }
  if (a3 == null || b2 == null) {
    return false;
  }
  if (a3 !== a3) {
    return b2 !== b2;
  }
  var type = typeof a3;
  if (type !== "function" && type !== "object" && typeof b2 != "object") {
    return false;
  }
  var className = toString.call(a3);
  if (className !== toString.call(b2)) {
    return false;
  }
  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a3 === "" + b2;
    case "[object Number]":
      if (+a3 !== +a3) {
        return +b2 !== +b2;
      }
      return +a3 === 0 ? 1 / +a3 === 1 / b2 : +a3 === +b2;
    case "[object Date]":
    case "[object Boolean]":
      return +a3 === +b2;
    case "[object Symbol]":
      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a3) === Symbol.valueOf.call(b2);
    case "[object Map]":
    case "[object Set]":
      if (depth >= 0) {
        depth++;
      }
      break;
  }
  a3 = unwrap(a3);
  b2 = unwrap(b2);
  var areArrays = className === "[object Array]";
  if (!areArrays) {
    if (typeof a3 != "object" || typeof b2 != "object") {
      return false;
    }
    var aCtor = a3.constructor, bCtor = b2.constructor;
    if (aCtor !== bCtor && !(isFunction2(aCtor) && aCtor instanceof aCtor && isFunction2(bCtor) && bCtor instanceof bCtor) && ("constructor" in a3) && ("constructor" in b2)) {
      return false;
    }
  }
  if (depth === 0) {
    return false;
  } else if (depth < 0) {
    depth = -1;
  }
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    if (aStack[length] === a3) {
      return bStack[length] === b2;
    }
  }
  aStack.push(a3);
  bStack.push(b2);
  if (areArrays) {
    length = a3.length;
    if (length !== b2.length) {
      return false;
    }
    while (length--) {
      if (!eq(a3[length], b2[length], depth - 1, aStack, bStack)) {
        return false;
      }
    }
  } else {
    var keys = Object.keys(a3);
    var key;
    length = keys.length;
    if (Object.keys(b2).length !== length) {
      return false;
    }
    while (length--) {
      key = keys[length];
      if (!(hasProp(b2, key) && eq(a3[key], b2[key], depth - 1, aStack, bStack))) {
        return false;
      }
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
};
var unwrap = function(a3) {
  if (isObservableArray(a3)) {
    return a3.slice();
  }
  if (isES6Map(a3) || isObservableMap(a3)) {
    return Array.from(a3.entries());
  }
  if (isES6Set(a3) || isObservableSet(a3)) {
    return Array.from(a3.entries());
  }
  return a3;
};
var makeIterable = function(iterator) {
  iterator[Symbol.iterator] = getSelf;
  return iterator;
};
var getSelf = function() {
  return this;
};
var isAnnotation = function(thing) {
  return thing instanceof Object && typeof thing.annotationType_ === "string" && isFunction2(thing.make_) && isFunction2(thing.extend_);
};
var niceErrors = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function _2(annotationType, key) {
    return "Cannot apply '" + annotationType + "' to '" + key.toString() + "': Field not found.";
  },
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function _3(index, length) {
    return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function _4(other) {
    return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
  },
  20: function _5(other) {
    return "Cannot initialize map from " + other;
  },
  21: function _6(dataStructure) {
    return "Cannot convert to map from '" + dataStructure + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function _7(thing) {
    return "Cannot obtain administration from " + thing;
  },
  25: function _8(property4, name) {
    return "the entry '" + property4 + "' does not exist in the observable map '" + name + "'";
  },
  26: "please specify a property",
  27: function _9(property4, name) {
    return "no observable property '" + property4.toString() + "' found on the observable object '" + name + "'";
  },
  28: function _10(thing) {
    return "Cannot obtain atom from " + thing;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function _11(name, derivation) {
    return "Cycle detected in computation " + name + ": " + derivation;
  },
  33: function _12(name) {
    return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function _13(name) {
    return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function _14(method) {
    return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
};
var errors = niceErrors;
var mockGlobal = {};
var assign = Object.assign;
var getDescriptor = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var objectPrototype = Object.prototype;
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
var hasProxy = typeof Proxy !== "undefined";
var plainObjectString = Object.toString();
var noop = function noop2() {
};
var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function(obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : Object.getOwnPropertyNames;
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(target) {
  var res = {};
  ownKeys(target).forEach(function(key) {
    res[key] = getDescriptor(target, key);
  });
  return res;
};
var storedAnnotationsSymbol = Symbol("mobx-stored-annotations");
var $mobx = Symbol("mobx administration");
var Atom = function() {
  function Atom2(name_) {
    if (name_ === undefined) {
      name_ = "Atom@" + getNextId();
    }
    this.name_ = undefined;
    this.isPendingUnobservation_ = false;
    this.isBeingObserved_ = false;
    this.observers_ = new Set;
    this.batchId_ = undefined;
    this.diffValue_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
    this.onBOL = undefined;
    this.onBUOL = undefined;
    this.name_ = name_;
    this.batchId_ = globalState.inBatch ? globalState.batchId : NaN;
  }
  var _proto = Atom2.prototype;
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.reportObserved = function reportObserved$1() {
    return reportObserved(this);
  };
  _proto.reportChanged = function reportChanged() {
    if (!globalState.inBatch || this.batchId_ !== globalState.batchId) {
      globalState.stateVersion = globalState.stateVersion < Number.MAX_SAFE_INTEGER ? globalState.stateVersion + 1 : Number.MIN_SAFE_INTEGER;
      this.batchId_ = NaN;
    }
    startBatch();
    propagateChanged(this);
    endBatch();
  };
  _proto.toString = function toString() {
    return this.name_;
  };
  return Atom2;
}();
var isAtom = createInstanceofPredicate("Atom", Atom);
var comparer = {
  identity: identityComparer,
  structural: structuralComparer,
  default: defaultComparer,
  shallow: shallowComparer
};
var OVERRIDE = "override";
var AUTO = "true";
var autoAnnotation = createAutoAnnotation();
var OBSERVABLE = "observable";
var OBSERVABLE_REF = "observable.ref";
var OBSERVABLE_SHALLOW = "observable.shallow";
var OBSERVABLE_STRUCT = "observable.struct";
var defaultCreateObservableOptions = {
  deep: true,
  name: undefined,
  defaultDecorator: undefined,
  proxy: true
};
Object.freeze(defaultCreateObservableOptions);
var observableAnnotation = createObservableAnnotation(OBSERVABLE);
var observableRefAnnotation = createObservableAnnotation(OBSERVABLE_REF, {
  enhancer: referenceEnhancer
});
var observableShallowAnnotation = createObservableAnnotation(OBSERVABLE_SHALLOW, {
  enhancer: shallowEnhancer
});
var observableStructAnnotation = createObservableAnnotation(OBSERVABLE_STRUCT, {
  enhancer: refStructEnhancer
});
var observableDecoratorAnnotation = createDecoratorAnnotation(observableAnnotation);
assign(createObservable, observableDecoratorAnnotation);
var observableFactories = {
  box: function box(value, options) {
    var o10 = asCreateObservableOptions(options);
    return new ObservableValue(value, getEnhancerFromOptions(o10), o10.name, true, o10.equals);
  },
  array: function array(initialValues, options) {
    var o10 = asCreateObservableOptions(options);
    return (globalState.useProxies === false || o10.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o10), o10.name);
  },
  map: function map(initialValues, options) {
    var o10 = asCreateObservableOptions(options);
    return new ObservableMap(initialValues, getEnhancerFromOptions(o10), o10.name);
  },
  set: function set(initialValues, options) {
    var o10 = asCreateObservableOptions(options);
    return new ObservableSet(initialValues, getEnhancerFromOptions(o10), o10.name);
  },
  object: function object(props, decorators15, options) {
    return initObservable(function() {
      return extendObservable(globalState.useProxies === false || (options == null ? undefined : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators15);
    });
  },
  ref: createDecoratorAnnotation(observableRefAnnotation),
  shallow: createDecoratorAnnotation(observableShallowAnnotation),
  deep: observableDecoratorAnnotation,
  struct: createDecoratorAnnotation(observableStructAnnotation)
};
var observable = assign(createObservable, observableFactories);
var COMPUTED = "computed";
var COMPUTED_STRUCT = "computed.struct";
var computedAnnotation = createComputedAnnotation(COMPUTED);
var computedStructAnnotation = createComputedAnnotation(COMPUTED_STRUCT, {
  equals: comparer.structural
});
var computed = function computed2(arg1, arg2) {
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, computedAnnotation);
  }
  if (isPlainObject(arg1)) {
    return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
  }
  if (true) {
    if (!isFunction2(arg1)) {
      die("First argument to `computed` should be an expression.");
    }
    if (isFunction2(arg2)) {
      die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
    }
  }
  var opts = isPlainObject(arg2) ? arg2 : {};
  opts.get = arg1;
  opts.name || (opts.name = arg1.name || "");
  return new ComputedValue(opts);
};
Object.assign(computed, computedAnnotation);
computed.struct = createDecoratorAnnotation(computedStructAnnotation);
var _getDescriptor$config;
var _getDescriptor;
var currentActionId = 0;
var nextActionId = 1;
var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = getDescriptor(function() {
}, "name")) == null ? undefined : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
var tmpNameDescriptor = {
  value: "action",
  configurable: true,
  writable: false,
  enumerable: false
};
var _Symbol$toPrimitive;
var CREATE = "create";
_Symbol$toPrimitive = Symbol.toPrimitive;
var ObservableValue = function(_Atom) {
  _inheritsLoose(ObservableValue2, _Atom);
  function ObservableValue2(value, enhancer, name_, notifySpy, equals) {
    var _this;
    if (name_ === undefined) {
      name_ = "ObservableValue@" + getNextId();
    }
    if (notifySpy === undefined) {
      notifySpy = true;
    }
    if (equals === undefined) {
      equals = comparer["default"];
    }
    _this = _Atom.call(this, name_) || this;
    _this.enhancer = undefined;
    _this.name_ = undefined;
    _this.equals = undefined;
    _this.hasUnreportedChange_ = false;
    _this.interceptors_ = undefined;
    _this.changeListeners_ = undefined;
    _this.value_ = undefined;
    _this.dehancer = undefined;
    _this.enhancer = enhancer;
    _this.name_ = name_;
    _this.equals = equals;
    _this.value_ = enhancer(value, undefined, name_);
    if (notifySpy && isSpyEnabled()) {
      spyReport({
        type: CREATE,
        object: _assertThisInitialized(_this),
        observableKind: "value",
        debugObjectName: _this.name_,
        newValue: "" + _this.value_
      });
    }
    return _this;
  }
  var _proto = ObservableValue2.prototype;
  _proto.dehanceValue = function dehanceValue(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.set = function set(newValue) {
    var oldValue = this.value_;
    newValue = this.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      if (notifySpy) {
        spyReportStart({
          type: UPDATE,
          object: this,
          observableKind: "value",
          debugObjectName: this.name_,
          newValue,
          oldValue
        });
      }
      this.setNewValue_(newValue);
      if (notifySpy) {
        spyReportEnd();
      }
    }
  };
  _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
    checkIfStateModificationsAreAllowed(this);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this,
        type: UPDATE,
        newValue
      });
      if (!change) {
        return globalState.UNCHANGED;
      }
      newValue = change.newValue;
    }
    newValue = this.enhancer(newValue, this.value_, this.name_);
    return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
  };
  _proto.setNewValue_ = function setNewValue_(newValue) {
    var oldValue = this.value_;
    this.value_ = newValue;
    this.reportChanged();
    if (hasListeners(this)) {
      notifyListeners(this, {
        type: UPDATE,
        object: this,
        newValue,
        oldValue
      });
    }
  };
  _proto.get = function get() {
    this.reportObserved();
    return this.dehanceValue(this.value_);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately) {
      listener({
        observableKind: "value",
        debugObjectName: this.name_,
        object: this,
        type: UPDATE,
        newValue: this.value_,
        oldValue: undefined
      });
    }
    return registerListener(this, listener);
  };
  _proto.raw = function raw() {
    return this.value_;
  };
  _proto.toJSON = function toJSON() {
    return this.get();
  };
  _proto.toString = function toString() {
    return this.name_ + "[" + this.value_ + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[_Symbol$toPrimitive] = function() {
    return this.valueOf();
  };
  return ObservableValue2;
}(Atom);
var _Symbol$toPrimitive$1;
_Symbol$toPrimitive$1 = Symbol.toPrimitive;
var ComputedValue = function() {
  function ComputedValue2(options) {
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.observing_ = [];
    this.newObserving_ = null;
    this.isBeingObserved_ = false;
    this.isPendingUnobservation_ = false;
    this.observers_ = new Set;
    this.diffValue_ = 0;
    this.runId_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    this.unboundDepsCount_ = 0;
    this.value_ = new CaughtException(null);
    this.name_ = undefined;
    this.triggeredBy_ = undefined;
    this.isComputing_ = false;
    this.isRunningSetter_ = false;
    this.derivation = undefined;
    this.setter_ = undefined;
    this.isTracing_ = TraceMode.NONE;
    this.scope_ = undefined;
    this.equals_ = undefined;
    this.requiresReaction_ = undefined;
    this.keepAlive_ = undefined;
    this.onBOL = undefined;
    this.onBUOL = undefined;
    if (!options.get) {
      die(31);
    }
    this.derivation = options.get;
    this.name_ = options.name || "ComputedValue@" + getNextId();
    if (options.set) {
      this.setter_ = createAction(this.name_ + "-setter", options.set);
    }
    this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
    this.scope_ = options.context;
    this.requiresReaction_ = options.requiresReaction;
    this.keepAlive_ = !!options.keepAlive;
  }
  var _proto = ComputedValue2.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    propagateMaybeChanged(this);
  };
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function(listener) {
        return listener();
      });
    }
  };
  _proto.get = function get() {
    if (this.isComputing_) {
      die(32, this.name_, this.derivation);
    }
    if (globalState.inBatch === 0 && this.observers_.size === 0 && !this.keepAlive_) {
      if (shouldCompute(this)) {
        this.warnAboutUntrackedRead_();
        startBatch();
        this.value_ = this.computeValue_(false);
        endBatch();
      }
    } else {
      reportObserved(this);
      if (shouldCompute(this)) {
        var prevTrackingContext = globalState.trackingContext;
        if (this.keepAlive_ && !prevTrackingContext) {
          globalState.trackingContext = this;
        }
        if (this.trackAndCompute()) {
          propagateChangeConfirmed(this);
        }
        globalState.trackingContext = prevTrackingContext;
      }
    }
    var result = this.value_;
    if (isCaughtException(result)) {
      throw result.cause;
    }
    return result;
  };
  _proto.set = function set(value) {
    if (this.setter_) {
      if (this.isRunningSetter_) {
        die(33, this.name_);
      }
      this.isRunningSetter_ = true;
      try {
        this.setter_.call(this.scope_, value);
      } finally {
        this.isRunningSetter_ = false;
      }
    } else {
      die(34, this.name_);
    }
  };
  _proto.trackAndCompute = function trackAndCompute() {
    var oldValue = this.value_;
    var wasSuspended = this.dependenciesState_ === IDerivationState_.NOT_TRACKING_;
    var newValue = this.computeValue_(true);
    var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
    if (changed) {
      this.value_ = newValue;
      if (isSpyEnabled()) {
        spyReport({
          observableKind: "computed",
          debugObjectName: this.name_,
          object: this.scope_,
          type: "update",
          oldValue,
          newValue
        });
      }
    }
    return changed;
  };
  _proto.computeValue_ = function computeValue_(track) {
    this.isComputing_ = true;
    var prev = allowStateChangesStart(false);
    var res;
    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.scope_);
    } else {
      if (globalState.disableErrorBoundaries === true) {
        res = this.derivation.call(this.scope_);
      } else {
        try {
          res = this.derivation.call(this.scope_);
        } catch (e8) {
          res = new CaughtException(e8);
        }
      }
    }
    allowStateChangesEnd(prev);
    this.isComputing_ = false;
    return res;
  };
  _proto.suspend_ = function suspend_() {
    if (!this.keepAlive_) {
      clearObserving(this);
      this.value_ = undefined;
      if (this.isTracing_ !== TraceMode.NONE) {
        console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access.");
      }
    }
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    var _this = this;
    var firstTime = true;
    var prevValue = undefined;
    return autorun(function() {
      var newValue = _this.get();
      if (!firstTime || fireImmediately) {
        var prevU = untrackedStart();
        listener({
          observableKind: "computed",
          debugObjectName: _this.name_,
          type: UPDATE,
          object: _this,
          newValue,
          oldValue: prevValue
        });
        untrackedEnd(prevU);
      }
      firstTime = false;
      prevValue = newValue;
    });
  };
  _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
    if (false) {
    }
    if (this.isTracing_ !== TraceMode.NONE) {
      console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
    if (typeof this.requiresReaction_ === "boolean" ? this.requiresReaction_ : globalState.computedRequiresReaction) {
      console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
  };
  _proto.toString = function toString() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[_Symbol$toPrimitive$1] = function() {
    return this.valueOf();
  };
  return ComputedValue2;
}();
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState_;
(function(IDerivationState_2) {
  IDerivationState_2[IDerivationState_2["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
  IDerivationState_2[IDerivationState_2["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
  IDerivationState_2[IDerivationState_2["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
  IDerivationState_2[IDerivationState_2["STALE_"] = 2] = "STALE_";
})(IDerivationState_ || (IDerivationState_ = {}));
var TraceMode;
(function(TraceMode2) {
  TraceMode2[TraceMode2["NONE"] = 0] = "NONE";
  TraceMode2[TraceMode2["LOG"] = 1] = "LOG";
  TraceMode2[TraceMode2["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));
var CaughtException = function CaughtException2(cause) {
  this.cause = undefined;
  this.cause = cause;
};
var MobXGlobals = function MobXGlobals2() {
  this.version = 6;
  this.UNCHANGED = {};
  this.trackingDerivation = null;
  this.trackingContext = null;
  this.runId = 0;
  this.mobxGuid = 0;
  this.inBatch = 0;
  this.batchId = Number.MIN_SAFE_INTEGER;
  this.pendingUnobservations = [];
  this.pendingReactions = [];
  this.isRunningReactions = false;
  this.allowStateChanges = false;
  this.allowStateReads = true;
  this.enforceActions = true;
  this.spyListeners = [];
  this.globalReactionErrorHandlers = [];
  this.computedRequiresReaction = false;
  this.reactionRequiresObservable = false;
  this.observableRequiresReaction = false;
  this.disableErrorBoundaries = false;
  this.suppressReactionErrors = false;
  this.useProxies = true;
  this.verifyProxies = false;
  this.safeDescriptors = true;
  this.stateVersion = Number.MIN_SAFE_INTEGER;
};
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState = function() {
  var global2 = getGlobal();
  if (global2.__mobxInstanceCount > 0 && !global2.__mobxGlobals) {
    canMergeGlobalState = false;
  }
  if (global2.__mobxGlobals && global2.__mobxGlobals.version !== new MobXGlobals().version) {
    canMergeGlobalState = false;
  }
  if (!canMergeGlobalState) {
    setTimeout(function() {
      if (!isolateCalled) {
        die(35);
      }
    }, 1);
    return new MobXGlobals;
  } else if (global2.__mobxGlobals) {
    global2.__mobxInstanceCount += 1;
    if (!global2.__mobxGlobals.UNCHANGED) {
      global2.__mobxGlobals.UNCHANGED = {};
    }
    return global2.__mobxGlobals;
  } else {
    global2.__mobxInstanceCount = 1;
    return global2.__mobxGlobals = new MobXGlobals;
  }
}();
var Reaction = function() {
  function Reaction2(name_, onInvalidate_, errorHandler_, requiresObservable_) {
    if (name_ === undefined) {
      name_ = "Reaction@" + getNextId();
    }
    this.name_ = undefined;
    this.onInvalidate_ = undefined;
    this.errorHandler_ = undefined;
    this.requiresObservable_ = undefined;
    this.observing_ = [];
    this.newObserving_ = [];
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.diffValue_ = 0;
    this.runId_ = 0;
    this.unboundDepsCount_ = 0;
    this.isDisposed_ = false;
    this.isScheduled_ = false;
    this.isTrackPending_ = false;
    this.isRunning_ = false;
    this.isTracing_ = TraceMode.NONE;
    this.name_ = name_;
    this.onInvalidate_ = onInvalidate_;
    this.errorHandler_ = errorHandler_;
    this.requiresObservable_ = requiresObservable_;
  }
  var _proto = Reaction2.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    this.schedule_();
  };
  _proto.schedule_ = function schedule_() {
    if (!this.isScheduled_) {
      this.isScheduled_ = true;
      globalState.pendingReactions.push(this);
      runReactions();
    }
  };
  _proto.isScheduled = function isScheduled() {
    return this.isScheduled_;
  };
  _proto.runReaction_ = function runReaction_() {
    if (!this.isDisposed_) {
      startBatch();
      this.isScheduled_ = false;
      var prev = globalState.trackingContext;
      globalState.trackingContext = this;
      if (shouldCompute(this)) {
        this.isTrackPending_ = true;
        try {
          this.onInvalidate_();
          if (this.isTrackPending_ && isSpyEnabled()) {
            spyReport({
              name: this.name_,
              type: "scheduled-reaction"
            });
          }
        } catch (e8) {
          this.reportExceptionInDerivation_(e8);
        }
      }
      globalState.trackingContext = prev;
      endBatch();
    }
  };
  _proto.track = function track(fn) {
    if (this.isDisposed_) {
      return;
    }
    startBatch();
    var notify = isSpyEnabled();
    var startTime;
    if (notify) {
      startTime = Date.now();
      spyReportStart({
        name: this.name_,
        type: "reaction"
      });
    }
    this.isRunning_ = true;
    var prevReaction = globalState.trackingContext;
    globalState.trackingContext = this;
    var result = trackDerivedFunction(this, fn, undefined);
    globalState.trackingContext = prevReaction;
    this.isRunning_ = false;
    this.isTrackPending_ = false;
    if (this.isDisposed_) {
      clearObserving(this);
    }
    if (isCaughtException(result)) {
      this.reportExceptionInDerivation_(result.cause);
    }
    if (notify) {
      spyReportEnd({
        time: Date.now() - startTime
      });
    }
    endBatch();
  };
  _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
    var _this = this;
    if (this.errorHandler_) {
      this.errorHandler_(error, this);
      return;
    }
    if (globalState.disableErrorBoundaries) {
      throw error;
    }
    var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
    if (!globalState.suppressReactionErrors) {
      console.error(message, error);
    } else if (true) {
      console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)");
    }
    if (isSpyEnabled()) {
      spyReport({
        type: "error",
        name: this.name_,
        message,
        error: "" + error
      });
    }
    globalState.globalReactionErrorHandlers.forEach(function(f2) {
      return f2(error, _this);
    });
  };
  _proto.dispose = function dispose() {
    if (!this.isDisposed_) {
      this.isDisposed_ = true;
      if (!this.isRunning_) {
        startBatch();
        clearObserving(this);
        endBatch();
      }
    }
  };
  _proto.getDisposer_ = function getDisposer_(abortSignal) {
    var _this2 = this;
    var dispose = function dispose() {
      _this2.dispose();
      abortSignal == null || abortSignal.removeEventListener == null || abortSignal.removeEventListener("abort", dispose);
    };
    abortSignal == null || abortSignal.addEventListener == null || abortSignal.addEventListener("abort", dispose);
    dispose[$mobx] = this;
    return dispose;
  };
  _proto.toString = function toString() {
    return "Reaction[" + this.name_ + "]";
  };
  _proto.trace = function trace$1(enterBreakPoint) {
    if (enterBreakPoint === undefined) {
      enterBreakPoint = false;
    }
    trace(this, enterBreakPoint);
  };
  return Reaction2;
}();
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function reactionScheduler2(f2) {
  return f2();
};
var isReaction = createInstanceofPredicate("Reaction", Reaction);
var END_EVENT = {
  type: "report-end",
  spyReportEnd: true
};
var ACTION = "action";
var ACTION_BOUND = "action.bound";
var AUTOACTION = "autoAction";
var AUTOACTION_BOUND = "autoAction.bound";
var DEFAULT_ACTION_NAME = "<unnamed action>";
var actionAnnotation = createActionAnnotation(ACTION);
var actionBoundAnnotation = createActionAnnotation(ACTION_BOUND, {
  bound: true
});
var autoActionAnnotation = createActionAnnotation(AUTOACTION, {
  autoAction: true
});
var autoActionBoundAnnotation = createActionAnnotation(AUTOACTION_BOUND, {
  autoAction: true,
  bound: true
});
var action = createActionFactory(false);
Object.assign(action, actionAnnotation);
var autoAction = createActionFactory(true);
Object.assign(autoAction, autoActionAnnotation);
action.bound = createDecoratorAnnotation(actionBoundAnnotation);
autoAction.bound = createDecoratorAnnotation(autoActionBoundAnnotation);
var run = function run2(f2) {
  return f2();
};
var ON_BECOME_OBSERVED = "onBO";
var ON_BECOME_UNOBSERVED = "onBUO";
var generatorId = 0;
FlowCancellationError.prototype = Object.create(Error.prototype);
var flowAnnotation = createFlowAnnotation("flow");
var flowBoundAnnotation = createFlowAnnotation("flow.bound", {
  bound: true
});
var flow = Object.assign(function flow2(arg1, arg2) {
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, flowAnnotation);
  }
  if (arguments.length !== 1) {
    die("Flow expects single argument with generator function");
  }
  var generator = arg1;
  var name = generator.name || "<unnamed flow>";
  var res = function res() {
    var ctx = this;
    var args = arguments;
    var runId = ++generatorId;
    var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
    var rejector;
    var pendingPromise = undefined;
    var promise = new Promise(function(resolve, reject) {
      var stepId = 0;
      rejector = reject;
      function onFulfilled(res2) {
        pendingPromise = undefined;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res2);
        } catch (e8) {
          return reject(e8);
        }
        next(ret);
      }
      function onRejected(err) {
        pendingPromise = undefined;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
        } catch (e8) {
          return reject(e8);
        }
        next(ret);
      }
      function next(ret) {
        if (isFunction2(ret == null ? undefined : ret.then)) {
          ret.then(next, reject);
          return;
        }
        if (ret.done) {
          return resolve(ret.value);
        }
        pendingPromise = Promise.resolve(ret.value);
        return pendingPromise.then(onFulfilled, onRejected);
      }
      onFulfilled(undefined);
    });
    promise.cancel = action(name + " - runid: " + runId + " - cancel", function() {
      try {
        if (pendingPromise) {
          cancelPromise(pendingPromise);
        }
        var _res = gen["return"](undefined);
        var yieldedPromise = Promise.resolve(_res.value);
        yieldedPromise.then(noop, noop);
        cancelPromise(yieldedPromise);
        rejector(new FlowCancellationError);
      } catch (e8) {
        rejector(e8);
      }
    });
    return promise;
  };
  res.isMobXFlow = true;
  return res;
}, flowAnnotation);
flow.bound = createDecoratorAnnotation(flowBoundAnnotation);
var objectProxyTraps = {
  has: function has(target, name) {
    if (globalState.trackingDerivation) {
      warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
    }
    return getAdm(target).has_(name);
  },
  get: function get(target, name) {
    return getAdm(target).get_(name);
  },
  set: function set2(target, name, value) {
    var _getAdm$set_;
    if (!isStringish(name)) {
      return false;
    }
    if (!getAdm(target).values_.has(name)) {
      warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
    }
    return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
  },
  deleteProperty: function deleteProperty(target, name) {
    var _getAdm$delete_;
    if (true) {
      warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
    }
    if (!isStringish(name)) {
      return false;
    }
    return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
  },
  defineProperty: function defineProperty2(target, name, descriptor) {
    var _getAdm$definePropert;
    if (true) {
      warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
    }
    return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
  },
  ownKeys: function ownKeys2(target) {
    if (globalState.trackingDerivation) {
      warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
    }
    return getAdm(target).ownKeys_();
  },
  preventExtensions: function preventExtensions(target) {
    die(13);
  }
};
var keysSymbol = Symbol("mobx-keys");
var SPLICE = "splice";
var UPDATE = "update";
var MAX_SPLICE_SIZE = 1e4;
var arrayTraps = {
  get: function get2(target, name) {
    var adm = target[$mobx];
    if (name === $mobx) {
      return adm;
    }
    if (name === "length") {
      return adm.getArrayLength_();
    }
    if (typeof name === "string" && !isNaN(name)) {
      return adm.get_(parseInt(name));
    }
    if (hasProp(arrayExtensions, name)) {
      return arrayExtensions[name];
    }
    return target[name];
  },
  set: function set3(target, name, value) {
    var adm = target[$mobx];
    if (name === "length") {
      adm.setArrayLength_(value);
    }
    if (typeof name === "symbol" || isNaN(name)) {
      target[name] = value;
    } else {
      adm.set_(parseInt(name), value);
    }
    return true;
  },
  preventExtensions: function preventExtensions2() {
    die(15);
  }
};
var ObservableArrayAdministration = function() {
  function ObservableArrayAdministration2(name, enhancer, owned_, legacyMode_) {
    if (name === undefined) {
      name = "ObservableArray@" + getNextId();
    }
    this.owned_ = undefined;
    this.legacyMode_ = undefined;
    this.atom_ = undefined;
    this.values_ = [];
    this.interceptors_ = undefined;
    this.changeListeners_ = undefined;
    this.enhancer_ = undefined;
    this.dehancer = undefined;
    this.proxy_ = undefined;
    this.lastKnownLength_ = 0;
    this.owned_ = owned_;
    this.legacyMode_ = legacyMode_;
    this.atom_ = new Atom(name);
    this.enhancer_ = function(newV, oldV) {
      return enhancer(newV, oldV, name + "[..]");
    };
  }
  var _proto = ObservableArrayAdministration2.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.dehanceValues_ = function dehanceValues_(values) {
    if (this.dehancer !== undefined && values.length > 0) {
      return values.map(this.dehancer);
    }
    return values;
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === undefined) {
      fireImmediately = false;
    }
    if (fireImmediately) {
      listener({
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: "splice",
        index: 0,
        added: this.values_.slice(),
        addedCount: this.values_.length,
        removed: [],
        removedCount: 0
      });
    }
    return registerListener(this, listener);
  };
  _proto.getArrayLength_ = function getArrayLength_() {
    this.atom_.reportObserved();
    return this.values_.length;
  };
  _proto.setArrayLength_ = function setArrayLength_(newLength) {
    if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
      die("Out of range: " + newLength);
    }
    var currentLength = this.values_.length;
    if (newLength === currentLength) {
      return;
    } else if (newLength > currentLength) {
      var newItems = new Array(newLength - currentLength);
      for (var i7 = 0;i7 < newLength - currentLength; i7++) {
        newItems[i7] = undefined;
      }
      this.spliceWithArray_(currentLength, 0, newItems);
    } else {
      this.spliceWithArray_(newLength, currentLength - newLength);
    }
  };
  _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
    if (oldLength !== this.lastKnownLength_) {
      die(16);
    }
    this.lastKnownLength_ += delta;
    if (this.legacyMode_ && delta > 0) {
      reserveArrayBuffer(oldLength + delta + 1);
    }
  };
  _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
    var _this = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    var length = this.values_.length;
    if (index === undefined) {
      index = 0;
    } else if (index > length) {
      index = length;
    } else if (index < 0) {
      index = Math.max(0, length + index);
    }
    if (arguments.length === 1) {
      deleteCount = length - index;
    } else if (deleteCount === undefined || deleteCount === null) {
      deleteCount = 0;
    } else {
      deleteCount = Math.max(0, Math.min(deleteCount, length - index));
    }
    if (newItems === undefined) {
      newItems = EMPTY_ARRAY;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_,
        type: SPLICE,
        index,
        removedCount: deleteCount,
        added: newItems
      });
      if (!change) {
        return EMPTY_ARRAY;
      }
      deleteCount = change.removedCount;
      newItems = change.added;
    }
    newItems = newItems.length === 0 ? newItems : newItems.map(function(v2) {
      return _this.enhancer_(v2, undefined);
    });
    if (this.legacyMode_ || true) {
      var lengthDelta = newItems.length - deleteCount;
      this.updateArrayLength_(length, lengthDelta);
    }
    var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
    if (deleteCount !== 0 || newItems.length !== 0) {
      this.notifyArraySplice_(index, newItems, res);
    }
    return this.dehanceValues_(res);
  };
  _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
    if (newItems.length < MAX_SPLICE_SIZE) {
      var _this$values_;
      return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
    } else {
      var res = this.values_.slice(index, index + deleteCount);
      var oldItems = this.values_.slice(index + deleteCount);
      this.values_.length += newItems.length - deleteCount;
      for (var i7 = 0;i7 < newItems.length; i7++) {
        this.values_[index + i7] = newItems[i7];
      }
      for (var _i = 0;_i < oldItems.length; _i++) {
        this.values_[index + newItems.length + _i] = oldItems[_i];
      }
      return res;
    }
  };
  _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      type: UPDATE,
      debugObjectName: this.atom_.name_,
      index,
      newValue,
      oldValue
    } : null;
    if (notifySpy) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (notifySpy) {
      spyReportEnd();
    }
  };
  _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: SPLICE,
      index,
      removed,
      added,
      removedCount: removed.length,
      addedCount: added.length
    } : null;
    if (notifySpy) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (notifySpy) {
      spyReportEnd();
    }
  };
  _proto.get_ = function get_(index) {
    if (this.legacyMode_ && index >= this.values_.length) {
      console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
      return;
    }
    this.atom_.reportObserved();
    return this.dehanceValue_(this.values_[index]);
  };
  _proto.set_ = function set_(index, newValue) {
    var values = this.values_;
    if (this.legacyMode_ && index > values.length) {
      die(17, index, values.length);
    }
    if (index < values.length) {
      checkIfStateModificationsAreAllowed(this.atom_);
      var oldValue = values[index];
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_,
          index,
          newValue
        });
        if (!change) {
          return;
        }
        newValue = change.newValue;
      }
      newValue = this.enhancer_(newValue, oldValue);
      var changed = newValue !== oldValue;
      if (changed) {
        values[index] = newValue;
        this.notifyArrayChildUpdate_(index, newValue, oldValue);
      }
    } else {
      var newItems = new Array(index + 1 - values.length);
      for (var i7 = 0;i7 < newItems.length - 1; i7++) {
        newItems[i7] = undefined;
      }
      newItems[newItems.length - 1] = newValue;
      this.spliceWithArray_(values.length, 0, newItems);
    }
  };
  return ObservableArrayAdministration2;
}();
var arrayExtensions = {
  clear: function clear() {
    return this.splice(0);
  },
  replace: function replace(newItems) {
    var adm = this[$mobx];
    return adm.spliceWithArray_(0, adm.values_.length, newItems);
  },
  toJSON: function toJSON() {
    return this.slice();
  },
  splice: function splice(index, deleteCount) {
    for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2;_key < _len; _key++) {
      newItems[_key - 2] = arguments[_key];
    }
    var adm = this[$mobx];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return adm.spliceWithArray_(index);
      case 2:
        return adm.spliceWithArray_(index, deleteCount);
    }
    return adm.spliceWithArray_(index, deleteCount, newItems);
  },
  spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
    return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
  },
  push: function push() {
    var adm = this[$mobx];
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0;_key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }
    adm.spliceWithArray_(adm.values_.length, 0, items);
    return adm.values_.length;
  },
  pop: function pop() {
    return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
  },
  shift: function shift() {
    return this.splice(0, 1)[0];
  },
  unshift: function unshift() {
    var adm = this[$mobx];
    for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0;_key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }
    adm.spliceWithArray_(0, 0, items);
    return adm.values_.length;
  },
  reverse: function reverse() {
    if (globalState.trackingDerivation) {
      die(37, "reverse");
    }
    this.replace(this.slice().reverse());
    return this;
  },
  sort: function sort() {
    if (globalState.trackingDerivation) {
      die(37, "sort");
    }
    var copy = this.slice();
    copy.sort.apply(copy, arguments);
    this.replace(copy);
    return this;
  },
  remove: function remove(value) {
    var adm = this[$mobx];
    var idx = adm.dehanceValues_(adm.values_).indexOf(value);
    if (idx > -1) {
      this.splice(idx, 1);
      return true;
    }
    return false;
  }
};
addArrayExtension("concat", simpleFunc);
addArrayExtension("flat", simpleFunc);
addArrayExtension("includes", simpleFunc);
addArrayExtension("indexOf", simpleFunc);
addArrayExtension("join", simpleFunc);
addArrayExtension("lastIndexOf", simpleFunc);
addArrayExtension("slice", simpleFunc);
addArrayExtension("toString", simpleFunc);
addArrayExtension("toLocaleString", simpleFunc);
addArrayExtension("every", mapLikeFunc);
addArrayExtension("filter", mapLikeFunc);
addArrayExtension("find", mapLikeFunc);
addArrayExtension("findIndex", mapLikeFunc);
addArrayExtension("flatMap", mapLikeFunc);
addArrayExtension("forEach", mapLikeFunc);
addArrayExtension("map", mapLikeFunc);
addArrayExtension("some", mapLikeFunc);
addArrayExtension("reduce", reduceLikeFunc);
addArrayExtension("reduceRight", reduceLikeFunc);
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
var _Symbol$iterator;
var _Symbol$toStringTag;
var ObservableMapMarker = {};
var ADD = "add";
var DELETE = "delete";
_Symbol$iterator = Symbol.iterator;
_Symbol$toStringTag = Symbol.toStringTag;
var ObservableMap = function() {
  function ObservableMap2(initialData, enhancer_, name_) {
    var _this = this;
    if (enhancer_ === undefined) {
      enhancer_ = deepEnhancer;
    }
    if (name_ === undefined) {
      name_ = "ObservableMap@" + getNextId();
    }
    this.enhancer_ = undefined;
    this.name_ = undefined;
    this[$mobx] = ObservableMapMarker;
    this.data_ = undefined;
    this.hasMap_ = undefined;
    this.keysAtom_ = undefined;
    this.interceptors_ = undefined;
    this.changeListeners_ = undefined;
    this.dehancer = undefined;
    this.enhancer_ = enhancer_;
    this.name_ = name_;
    if (!isFunction2(Map)) {
      die(18);
    }
    initObservable(function() {
      _this.keysAtom_ = createAtom(_this.name_ + ".keys()");
      _this.data_ = new Map;
      _this.hasMap_ = new Map;
      if (initialData) {
        _this.merge(initialData);
      }
    });
  }
  var _proto = ObservableMap2.prototype;
  _proto.has_ = function has_(key) {
    return this.data_.has(key);
  };
  _proto.has = function has(key) {
    var _this2 = this;
    if (!globalState.trackingDerivation) {
      return this.has_(key);
    }
    var entry = this.hasMap_.get(key);
    if (!entry) {
      var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?", false);
      this.hasMap_.set(key, newEntry);
      onBecomeUnobserved(newEntry, function() {
        return _this2.hasMap_["delete"](key);
      });
    }
    return entry.get();
  };
  _proto.set = function set(key, value) {
    var hasKey = this.has_(key);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: hasKey ? UPDATE : ADD,
        object: this,
        newValue: value,
        name: key
      });
      if (!change) {
        return this;
      }
      value = change.newValue;
    }
    if (hasKey) {
      this.updateValue_(key, value);
    } else {
      this.addValue_(key, value);
    }
    return this;
  };
  _proto["delete"] = function _delete(key) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        name: key
      });
      if (!change) {
        return false;
      }
    }
    if (this.has_(key)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: this.data_.get(key).value_,
        name: key
      } : null;
      if (notifySpy) {
        spyReportStart(_change);
      }
      transaction(function() {
        var _this3$hasMap_$get;
        _this3.keysAtom_.reportChanged();
        (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null || _this3$hasMap_$get.setNewValue_(false);
        var observable2 = _this3.data_.get(key);
        observable2.setNewValue_(undefined);
        _this3.data_["delete"](key);
      });
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.updateValue_ = function updateValue_(key, newValue) {
    var observable2 = this.data_.get(key);
    newValue = observable2.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: UPDATE,
        object: this,
        oldValue: observable2.value_,
        name: key,
        newValue
      } : null;
      if (notifySpy) {
        spyReportStart(change);
      }
      observable2.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    }
  };
  _proto.addValue_ = function addValue_(key, newValue) {
    var _this4 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    transaction(function() {
      var _this4$hasMap_$get;
      var observable2 = new ObservableValue(newValue, _this4.enhancer_, _this4.name_ + "." + stringifyKey(key), false);
      _this4.data_.set(key, observable2);
      newValue = observable2.value_;
      (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null || _this4$hasMap_$get.setNewValue_(true);
      _this4.keysAtom_.reportChanged();
    });
    var notifySpy = isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: ADD,
      object: this,
      name: key,
      newValue
    } : null;
    if (notifySpy) {
      spyReportStart(change);
    }
    if (notify) {
      notifyListeners(this, change);
    }
    if (notifySpy) {
      spyReportEnd();
    }
  };
  _proto.get = function get(key) {
    if (this.has(key)) {
      return this.dehanceValue_(this.data_.get(key).get());
    }
    return this.dehanceValue_(undefined);
  };
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.keys = function keys() {
    this.keysAtom_.reportObserved();
    return this.data_.keys();
  };
  _proto.values = function values() {
    var self2 = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next = keys.next(), done = _keys$next.done, value = _keys$next.value;
        return {
          done,
          value: done ? undefined : self2.get(value)
        };
      }
    });
  };
  _proto.entries = function entries() {
    var self2 = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next2 = keys.next(), done = _keys$next2.done, value = _keys$next2.value;
        return {
          done,
          value: done ? undefined : [value, self2.get(value)]
        };
      }
    });
  };
  _proto[_Symbol$iterator] = function() {
    return this.entries();
  };
  _proto.forEach = function forEach(callback, thisArg) {
    for (var _iterator = _createForOfIteratorHelperLoose(this), _step;!(_step = _iterator()).done; ) {
      var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
      callback.call(thisArg, value, key, this);
    }
  };
  _proto.merge = function merge(other) {
    var _this5 = this;
    if (isObservableMap(other)) {
      other = new Map(other);
    }
    transaction(function() {
      if (isPlainObject(other)) {
        getPlainObjectKeys(other).forEach(function(key) {
          return _this5.set(key, other[key]);
        });
      } else if (Array.isArray(other)) {
        other.forEach(function(_ref) {
          var key = _ref[0], value = _ref[1];
          return _this5.set(key, value);
        });
      } else if (isES6Map(other)) {
        if (other.constructor !== Map) {
          die(19, other);
        }
        other.forEach(function(value, key) {
          return _this5.set(key, value);
        });
      } else if (other !== null && other !== undefined) {
        die(20, other);
      }
    });
    return this;
  };
  _proto.clear = function clear() {
    var _this6 = this;
    transaction(function() {
      untracked(function() {
        for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2;!(_step2 = _iterator2()).done; ) {
          var key = _step2.value;
          _this6["delete"](key);
        }
      });
    });
  };
  _proto.replace = function replace(values) {
    var _this7 = this;
    transaction(function() {
      var replacementMap = convertToMap(values);
      var orderedData = new Map;
      var keysReportChangedCalled = false;
      for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3;!(_step3 = _iterator3()).done; ) {
        var key = _step3.value;
        if (!replacementMap.has(key)) {
          var deleted = _this7["delete"](key);
          if (deleted) {
            keysReportChangedCalled = true;
          } else {
            var value = _this7.data_.get(key);
            orderedData.set(key, value);
          }
        }
      }
      for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4;!(_step4 = _iterator4()).done; ) {
        var _step4$value = _step4.value, _key = _step4$value[0], _value = _step4$value[1];
        var keyExisted = _this7.data_.has(_key);
        _this7.set(_key, _value);
        if (_this7.data_.has(_key)) {
          var _value2 = _this7.data_.get(_key);
          orderedData.set(_key, _value2);
          if (!keyExisted) {
            keysReportChangedCalled = true;
          }
        }
      }
      if (!keysReportChangedCalled) {
        if (_this7.data_.size !== orderedData.size) {
          _this7.keysAtom_.reportChanged();
        } else {
          var iter1 = _this7.data_.keys();
          var iter2 = orderedData.keys();
          var next1 = iter1.next();
          var next2 = iter2.next();
          while (!next1.done) {
            if (next1.value !== next2.value) {
              _this7.keysAtom_.reportChanged();
              break;
            }
            next1 = iter1.next();
            next2 = iter2.next();
          }
        }
      }
      _this7.data_ = orderedData;
    });
    return this;
  };
  _proto.toString = function toString() {
    return "[object ObservableMap]";
  };
  _proto.toJSON = function toJSON() {
    return Array.from(this);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === true) {
      die("`observe` doesn't support fireImmediately=true in combination with maps.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _createClass(ObservableMap2, [{
    key: "size",
    get: function get() {
      this.keysAtom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return "Map";
    }
  }]);
  return ObservableMap2;
}();
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
var _Symbol$iterator$1;
var _Symbol$toStringTag$1;
var ObservableSetMarker = {};
_Symbol$iterator$1 = Symbol.iterator;
_Symbol$toStringTag$1 = Symbol.toStringTag;
var ObservableSet = function() {
  function ObservableSet2(initialData, enhancer, name_) {
    var _this = this;
    if (enhancer === undefined) {
      enhancer = deepEnhancer;
    }
    if (name_ === undefined) {
      name_ = "ObservableSet@" + getNextId();
    }
    this.name_ = undefined;
    this[$mobx] = ObservableSetMarker;
    this.data_ = new Set;
    this.atom_ = undefined;
    this.changeListeners_ = undefined;
    this.interceptors_ = undefined;
    this.dehancer = undefined;
    this.enhancer_ = undefined;
    this.name_ = name_;
    if (!isFunction2(Set)) {
      die(22);
    }
    this.enhancer_ = function(newV, oldV) {
      return enhancer(newV, oldV, name_);
    };
    initObservable(function() {
      _this.atom_ = createAtom(_this.name_);
      if (initialData) {
        _this.replace(initialData);
      }
    });
  }
  var _proto = ObservableSet2.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.clear = function clear() {
    var _this2 = this;
    transaction(function() {
      untracked(function() {
        for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step;!(_step = _iterator()).done; ) {
          var value = _step.value;
          _this2["delete"](value);
        }
      });
    });
  };
  _proto.forEach = function forEach(callbackFn, thisArg) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2;!(_step2 = _iterator2()).done; ) {
      var value = _step2.value;
      callbackFn.call(thisArg, value, value, this);
    }
  };
  _proto.add = function add(value) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: ADD,
        object: this,
        newValue: value
      });
      if (!change) {
        return this;
      }
    }
    if (!this.has(value)) {
      transaction(function() {
        _this3.data_.add(_this3.enhancer_(value, undefined));
        _this3.atom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        newValue: value
      } : null;
      if (notifySpy && true) {
        spyReportStart(_change);
      }
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy && true) {
        spyReportEnd();
      }
    }
    return this;
  };
  _proto["delete"] = function _delete(value) {
    var _this4 = this;
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        oldValue: value
      });
      if (!change) {
        return false;
      }
    }
    if (this.has(value)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change2 = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: value
      } : null;
      if (notifySpy && true) {
        spyReportStart(_change2);
      }
      transaction(function() {
        _this4.atom_.reportChanged();
        _this4.data_["delete"](value);
      });
      if (notify) {
        notifyListeners(this, _change2);
      }
      if (notifySpy && true) {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.has = function has(value) {
    this.atom_.reportObserved();
    return this.data_.has(this.dehanceValue_(value));
  };
  _proto.entries = function entries() {
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    var values = Array.from(this.values());
    return makeIterable({
      next: function next() {
        var index = nextIndex;
        nextIndex += 1;
        return index < values.length ? {
          value: [keys[index], values[index]],
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.keys = function keys() {
    return this.values();
  };
  _proto.values = function values() {
    this.atom_.reportObserved();
    var self2 = this;
    var nextIndex = 0;
    var observableValues = Array.from(this.data_.values());
    return makeIterable({
      next: function next() {
        return nextIndex < observableValues.length ? {
          value: self2.dehanceValue_(observableValues[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.replace = function replace(other) {
    var _this5 = this;
    if (isObservableSet(other)) {
      other = new Set(other);
    }
    transaction(function() {
      if (Array.isArray(other)) {
        _this5.clear();
        other.forEach(function(value) {
          return _this5.add(value);
        });
      } else if (isES6Set(other)) {
        _this5.clear();
        other.forEach(function(value) {
          return _this5.add(value);
        });
      } else if (other !== null && other !== undefined) {
        die("Cannot initialize set from " + other);
      }
    });
    return this;
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === true) {
      die("`observe` doesn't support fireImmediately=true in combination with sets.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.toJSON = function toJSON() {
    return Array.from(this);
  };
  _proto.toString = function toString() {
    return "[object ObservableSet]";
  };
  _proto[_Symbol$iterator$1] = function() {
    return this.values();
  };
  _createClass(ObservableSet2, [{
    key: "size",
    get: function get() {
      this.atom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: _Symbol$toStringTag$1,
    get: function get() {
      return "Set";
    }
  }]);
  return ObservableSet2;
}();
var isObservableSet = createInstanceofPredicate("ObservableSet", ObservableSet);
var descriptorCache = Object.create(null);
var REMOVE = "remove";
var ObservableObjectAdministration = function() {
  function ObservableObjectAdministration2(target_, values_, name_, defaultAnnotation_) {
    if (values_ === undefined) {
      values_ = new Map;
    }
    if (defaultAnnotation_ === undefined) {
      defaultAnnotation_ = autoAnnotation;
    }
    this.target_ = undefined;
    this.values_ = undefined;
    this.name_ = undefined;
    this.defaultAnnotation_ = undefined;
    this.keysAtom_ = undefined;
    this.changeListeners_ = undefined;
    this.interceptors_ = undefined;
    this.proxy_ = undefined;
    this.isPlainObject_ = undefined;
    this.appliedAnnotations_ = undefined;
    this.pendingKeys_ = undefined;
    this.target_ = target_;
    this.values_ = values_;
    this.name_ = name_;
    this.defaultAnnotation_ = defaultAnnotation_;
    this.keysAtom_ = new Atom(this.name_ + ".keys");
    this.isPlainObject_ = isPlainObject(this.target_);
    if (!isAnnotation(this.defaultAnnotation_)) {
      die("defaultAnnotation must be valid annotation");
    }
    if (true) {
      this.appliedAnnotations_ = {};
    }
  }
  var _proto = ObservableObjectAdministration2.prototype;
  _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
    return this.values_.get(key).get();
  };
  _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
    var observable2 = this.values_.get(key);
    if (observable2 instanceof ComputedValue) {
      observable2.set(newValue);
      return true;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: UPDATE,
        object: this.proxy_ || this.target_,
        name: key,
        newValue
      });
      if (!change) {
        return null;
      }
      newValue = change.newValue;
    }
    newValue = observable2.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var _change = notify || notifySpy ? {
        type: UPDATE,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: observable2.value_,
        name: key,
        newValue
      } : null;
      if (notifySpy) {
        spyReportStart(_change);
      }
      observable2.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    }
    return true;
  };
  _proto.get_ = function get_(key) {
    if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
      this.has_(key);
    }
    return this.target_[key];
  };
  _proto.set_ = function set_(key, value, proxyTrap) {
    if (proxyTrap === undefined) {
      proxyTrap = false;
    }
    if (hasProp(this.target_, key)) {
      if (this.values_.has(key)) {
        return this.setObservablePropValue_(key, value);
      } else if (proxyTrap) {
        return Reflect.set(this.target_, key, value);
      } else {
        this.target_[key] = value;
        return true;
      }
    } else {
      return this.extend_(key, {
        value,
        enumerable: true,
        writable: true,
        configurable: true
      }, this.defaultAnnotation_, proxyTrap);
    }
  };
  _proto.has_ = function has_(key) {
    if (!globalState.trackingDerivation) {
      return key in this.target_;
    }
    this.pendingKeys_ || (this.pendingKeys_ = new Map);
    var entry = this.pendingKeys_.get(key);
    if (!entry) {
      entry = new ObservableValue(key in this.target_, referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?", false);
      this.pendingKeys_.set(key, entry);
    }
    return entry.get();
  };
  _proto.make_ = function make_(key, annotation) {
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return;
    }
    assertAnnotable(this, annotation, key);
    if (!(key in this.target_)) {
      var _this$target_$storedA;
      if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
        return;
      } else {
        die(1, annotation.annotationType_, this.name_ + "." + key.toString());
      }
    }
    var source = this.target_;
    while (source && source !== objectPrototype) {
      var descriptor = getDescriptor(source, key);
      if (descriptor) {
        var outcome = annotation.make_(this, key, descriptor, source);
        if (outcome === 0) {
          return;
        }
        if (outcome === 1) {
          break;
        }
      }
      source = Object.getPrototypeOf(source);
    }
    recordAnnotationApplied(this, annotation, key);
  };
  _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
    if (proxyTrap === undefined) {
      proxyTrap = false;
    }
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return this.defineProperty_(key, descriptor, proxyTrap);
    }
    assertAnnotable(this, annotation, key);
    var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
    if (outcome) {
      recordAnnotationApplied(this, annotation, key);
    }
    return outcome;
  };
  _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
    if (proxyTrap === undefined) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: descriptor.value
        });
        if (!change) {
          return null;
        }
        var newValue = change.newValue;
        if (descriptor.value !== newValue) {
          descriptor = _extends({}, descriptor, {
            value: newValue
          });
        }
      }
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.notifyPropertyAddition_(key, descriptor.value);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
    if (proxyTrap === undefined) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: value
        });
        if (!change) {
          return null;
        }
        value = change.newValue;
      }
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: true,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      var observable2 = new ObservableValue(value, enhancer, this.name_ + "." + key.toString(), false);
      this.values_.set(key, observable2);
      this.notifyPropertyAddition_(key, observable2.value_);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
    if (proxyTrap === undefined) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        return deleteOutcome;
      }
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: undefined
        });
        if (!change) {
          return null;
        }
      }
      options.name || (options.name = this.name_ + "." + key.toString());
      options.context = this.proxy_ || this.target_;
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: false,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.values_.set(key, new ComputedValue(options));
      this.notifyPropertyAddition_(key, undefined);
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.delete_ = function delete_(key, proxyTrap) {
    if (proxyTrap === undefined) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (!hasProp(this.target_, key)) {
      return true;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_ || this.target_,
        name: key,
        type: REMOVE
      });
      if (!change) {
        return null;
      }
    }
    try {
      var _this$pendingKeys_, _this$pendingKeys_$ge;
      startBatch();
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var observable2 = this.values_.get(key);
      var value = undefined;
      if (!observable2 && (notify || notifySpy)) {
        var _getDescriptor2;
        value = (_getDescriptor2 = getDescriptor(this.target_, key)) == null ? undefined : _getDescriptor2.value;
      }
      if (proxyTrap) {
        if (!Reflect.deleteProperty(this.target_, key)) {
          return false;
        }
      } else {
        delete this.target_[key];
      }
      if (true) {
        delete this.appliedAnnotations_[key];
      }
      if (observable2) {
        this.values_["delete"](key);
        if (observable2 instanceof ObservableValue) {
          value = observable2.value_;
        }
        propagateChanged(observable2);
      }
      this.keysAtom_.reportChanged();
      (_this$pendingKeys_ = this.pendingKeys_) == null || (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null || _this$pendingKeys_$ge.set(key in this.target_);
      if (notify || notifySpy) {
        var _change2 = {
          type: REMOVE,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: value,
          name: key
        };
        if (notifySpy) {
          spyReportStart(_change2);
        }
        if (notify) {
          notifyListeners(this, _change2);
        }
        if (notifySpy) {
          spyReportEnd();
        }
      }
    } finally {
      endBatch();
    }
    return true;
  };
  _proto.observe_ = function observe_(callback, fireImmediately) {
    if (fireImmediately === true) {
      die("`observe` doesn't support the fire immediately property for observable objects.");
    }
    return registerListener(this, callback);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
    var _this$pendingKeys_2, _this$pendingKeys_2$g;
    var notify = hasListeners(this);
    var notifySpy = isSpyEnabled();
    if (notify || notifySpy) {
      var change = notify || notifySpy ? {
        type: ADD,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: key,
        newValue: value
      } : null;
      if (notifySpy) {
        spyReportStart(change);
      }
      if (notify) {
        notifyListeners(this, change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    }
    (_this$pendingKeys_2 = this.pendingKeys_) == null || (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null || _this$pendingKeys_2$g.set(true);
    this.keysAtom_.reportChanged();
  };
  _proto.ownKeys_ = function ownKeys_() {
    this.keysAtom_.reportObserved();
    return ownKeys(this.target_);
  };
  _proto.keys_ = function keys_() {
    this.keysAtom_.reportObserved();
    return Object.keys(this.target_);
  };
  return ObservableObjectAdministration2;
}();
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
var ENTRY_0 = createArrayEntryDescriptor(0);
var safariPrototypeSetterInheritanceBug = function() {
  var v2 = false;
  var p2 = {};
  Object.defineProperty(p2, "0", {
    set: function set() {
      v2 = true;
    }
  });
  Object.create(p2)["0"] = 1;
  return v2 === false;
}();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = function StubArray2() {
};
inherit(StubArray, Array.prototype);
var LegacyObservableArray = function(_StubArray, _Symbol$toStringTag2, _Symbol$iterator2) {
  _inheritsLoose(LegacyObservableArray2, _StubArray);
  function LegacyObservableArray2(initialValues, enhancer, name, owned) {
    var _this;
    if (name === undefined) {
      name = "ObservableArray@" + getNextId();
    }
    if (owned === undefined) {
      owned = false;
    }
    _this = _StubArray.call(this) || this;
    initObservable(function() {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
      adm.proxy_ = _assertThisInitialized(_this);
      addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);
      if (initialValues && initialValues.length) {
        _this.spliceWithArray(0, 0, initialValues);
      }
      if (safariPrototypeSetterInheritanceBug) {
        Object.defineProperty(_assertThisInitialized(_this), "0", ENTRY_0);
      }
    });
    return _this;
  }
  var _proto = LegacyObservableArray2.prototype;
  _proto.concat = function concat() {
    this[$mobx].atom_.reportObserved();
    for (var _len = arguments.length, arrays = new Array(_len), _key = 0;_key < _len; _key++) {
      arrays[_key] = arguments[_key];
    }
    return Array.prototype.concat.apply(this.slice(), arrays.map(function(a3) {
      return isObservableArray(a3) ? a3.slice() : a3;
    }));
  };
  _proto[_Symbol$iterator2] = function() {
    var self2 = this;
    var nextIndex = 0;
    return makeIterable({
      next: function next() {
        return nextIndex < self2.length ? {
          value: self2[nextIndex++],
          done: false
        } : {
          done: true,
          value: undefined
        };
      }
    });
  };
  _createClass(LegacyObservableArray2, [{
    key: "length",
    get: function get() {
      return this[$mobx].getArrayLength_();
    },
    set: function set(newLength) {
      this[$mobx].setArrayLength_(newLength);
    }
  }, {
    key: _Symbol$toStringTag2,
    get: function get() {
      return "Array";
    }
  }]);
  return LegacyObservableArray2;
}(StubArray, Symbol.toStringTag, Symbol.iterator);
Object.entries(arrayExtensions).forEach(function(_ref) {
  var prop = _ref[0], fn = _ref[1];
  if (prop !== "concat") {
    addHiddenProp(LegacyObservableArray.prototype, prop, fn);
  }
});
reserveArrayBuffer(1000);
var toString = objectPrototype.toString;
["Symbol", "Map", "Set"].forEach(function(m2) {
  var g2 = getGlobal();
  if (typeof g2[m2] === "undefined") {
    die("MobX requires global '" + m2 + "' to be available or polyfilled");
  }
});
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy,
    extras: {
      getDebugName
    },
    $mobx
  });
}

// src/model/bot.ts
class Engine {
  name;
  path;
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }
}
var Engines = [
  new Engine("Stockfish", "bots/stockfish.js-10.0.2/stockfish.js"),
  new Engine("Lozza", "bots/lozza-1.18/lozza.js")
];

class Bot {
  name;
  engine;
  skill;
  time;
  depth;
  constructor(name, engine, skill, time, depth) {
    this.name = name;
    this.engine = engine;
    this.skill = skill;
    this.time = time;
    this.depth = depth;
  }
  label = "Bot";
  properties = new Map([
    ["name", { get: () => this.name, set: (value) => this.name = value }],
    ["engine", { get: () => this.engine, set: (value) => this.engine = value }],
    [
      "skill",
      { get: () => this.toTxt(this.skill), set: (value) => this.skill = this.toInt(value) }
    ],
    ["time", { get: () => this.toTxt(this.time), set: (value) => this.time = this.toInt(value) }],
    [
      "depth",
      { get: () => this.toTxt(this.depth), set: (value) => this.depth = this.toInt(value) }
    ]
  ]);
  getName = () => this.name;
  getDescription = () => `${this.engine},${this.skill},${this.time ?? ""},${this.depth ?? ""}`;
  validate = () => {
    if (!this.name.length)
      return "Need to enter a name";
    if (!this.engine)
      return "Need to select a chess engine";
    const nSkill = this.skill;
    if (isNaN(nSkill) || nSkill < 1 || nSkill > 20)
      return "Need to enter skill level between 1 and 20";
    const nTime = this.time;
    if (nTime && (isNaN(nTime) || nTime < 1 || nTime > 60))
      return "Need to enter a time between 1 and 60 seconds";
    const nDepth = this.depth;
    if (!nTime == !nDepth)
      return "Need to enter time or depth, but not both";
    if (nDepth && (isNaN(nDepth) || nDepth < 6 || nDepth > 30))
      return "Need to enter depth between 6 and 30";
    return "";
  };
  toInt = (num) => {
    const parsed = Number.parseInt(num);
    return isNaN(parsed) ? 0 : parsed;
  };
  toTxt = (num) => {
    return isNaN(num) ? "0" : num.toString();
  };
  setEngine(value) {
    this.engine = value;
  }
  get getUciEngineDef() {
    return Engines.find((engine) => engine.name == this.engine) ?? Engines[0];
  }
  static init = [
    new Bot("Stockfish easy", "Stockfish", 20, 1, 0),
    new Bot("Stockfish med", "Stockfish", 1, 0, 10),
    new Bot("Stockfish hard", "Stockfish", 20, 0, 1),
    new Bot("Lozza easy", "Lozza", 20, 1, 0),
    new Bot("Lozza med", "Lozza", 1, 0, 10),
    new Bot("Lozza hard", "Lozza", 20, 0, 1)
  ];
  static create = () => new Bot("", "Stockfish", 0, 0, 0);
}

// src/model/human.ts
class Human {
  name;
  email;
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  label = "Human";
  properties = new Map([
    ["name", { get: () => this.name, set: (value) => this.name = value }],
    ["email", { get: () => this.email, set: (value) => this.email = value }]
  ]);
  getName = () => this.name;
  getDescription = () => this.email;
  validate = () => this.name.length ? "" : "Need to enter a name";
  static init = [new Human("User", "")];
  static create = () => new Human("", "");
}

// src/model/clock.ts
class Clock {
  name;
  time;
  constructor(name, time) {
    this.name = name;
    this.time = time;
  }
  label = "Clock";
  getName = () => this.name.trim();
  getDescription = () => Clock.time2string(this.time);
  properties = new Map([
    ["name", { get: () => this.name, set: (value) => this.name = value }],
    ["time", { get: this.getDescription, set: (value) => this.time = Clock.string2time(value) }]
  ]);
  validate = () => this.name.length ? "" : "Need to enter a name";
  getAllowed(moves) {
    const total = this.time.filter((time) => moves >= time.from).reduce((total2, time) => time.plus * 60 + time.each * (moves - time.from), 0);
    return total;
  }
  static string2time = (text) => text.split(",").map((x2) => {
    const i1 = Number.parseInt(x2.split("+")[0].split("/")[0]);
    const s22 = x2.split("+");
    const i22 = s22.length > 1 ? Number.parseInt(s22[1].split("/")[0]) : 0;
    const s32 = x2.split("/");
    const i32 = s32.length > 1 ? Number.parseInt(s32[1]) : 0;
    return {
      from: isNaN(i1) ? 0 : i1,
      plus: isNaN(i22) ? 0 : i22,
      each: isNaN(i32) ? 0 : i32
    };
  });
  static time2string = (time) => time.map((s5) => `${s5.from ? s5.plus : ""}${s5.plus ? "+" + s5.plus : ""}${s5.each ? "/" + s5.each : ""}`).join(",");
  static init = [
    new Clock("No limit", []),
    new Clock("FIDE Classic - 120/60/13/30", [
      { from: 0, plus: 120, each: 0 },
      { from: 40, plus: 60, each: 0 },
      { from: 60, plus: 15, each: 10 }
    ]),
    new Clock("FIDE Rapid - 15/10", [{ from: 0, plus: 15, each: 10 }]),
    new Clock("Rapid - 10/10", [{ from: 0, plus: 10, each: 10 }]),
    new Clock("FIDE Blitz - 3/2", [{ from: 0, plus: 3, each: 2 }]),
    new Clock("Blitz - 5/0", [{ from: 0, plus: 5, each: 0 }])
  ];
  static create = () => new Clock("", []);
}

// node_modules/json-ignore/index.js
var jsonIgnore = function() {
  return Reflect.metadata(formatMetadataKey, true);
};
var getJsonIgnore = function(object2, propertyKey) {
  return Reflect.getMetadata(formatMetadataKey, object2, propertyKey);
};
var jsonIgnoreReplacer = function(key, value) {
  var meta = getJsonIgnore(this, key);
  if (meta === true) {
    return;
  }
  var constant = getJsonReplaceByConstant(this, key);
  if (constant != null) {
    return constant;
  }
  var childKey = getJsonReplaceByChildValue(this, key);
  if (childKey != null) {
    return value[childKey];
  }
  return value;
};
var getJsonReplaceByChildValue = function(object2, propertyKey) {
  return Reflect.getMetadata(jsonReplaceByKeyConst, object2, propertyKey);
};
var getJsonReplaceByConstant = function(object2, propertyKey) {
  return Reflect.getMetadata(jsonReplaceByValueConst, object2, propertyKey);
};
init_Reflect();
var formatMetadataKey = "jsonIgnore";
var jsonReplaceByKeyConst = "jsonReplaceByKey";
var jsonReplaceByValueConst = "jsonReplaceByValue";
var $jsonIgnore = jsonIgnore;
var $jsonIgnoreReplacer = jsonIgnoreReplacer;

// src/service/config.service.ts
var ListMode;
(function(ListMode2) {
  ListMode2[ListMode2["None"] = 1] = "None";
  ListMode2[ListMode2["Edit"] = 2] = "Edit";
  ListMode2[ListMode2["Add"] = 3] = "Add";
})(ListMode || (ListMode = {}));
var ListType;
(function(ListType2) {
  ListType2[ListType2["None"] = 1] = "None";
  ListType2[ListType2["Human"] = 2] = "Human";
  ListType2[ListType2["Bot"] = 3] = "Bot";
  ListType2[ListType2["Clock"] = 4] = "Clock";
})(ListType || (ListType = {}));

class ConfigService {
  static storage = "config";
  white;
  black;
  clock;
  rotation;
  showHints;
  showCP;
  showFacts;
  playMistake;
  playCorrect;
  playWinner;
  humans;
  bots;
  clocks;
  newItem = Human.create();
  constructor() {
    this.showConfig = false;
    this.showTab = 0;
    this.cursor = -1;
    this.listType = ListType.None;
    this.listMode = ListMode.None;
    this.boolprops = new Map([
      [
        "darkTheme",
        { get: () => renderingService.darkTheme, set: (value) => renderingService.darkTheme = value }
      ],
      ["showHints", { get: () => this.showHints, set: (value) => this.showHints = value }],
      ["showCP", { get: () => this.showCP, set: (value) => this.showCP = value }],
      ["showFacts", { get: () => this.showFacts, set: (value) => this.showFacts = value }],
      ["playMistake", { get: () => this.playMistake, set: (value) => this.playMistake = value }],
      ["playCorrect", { get: () => this.playCorrect, set: (value) => this.playCorrect = value }],
      ["playWinner", { get: () => this.playWinner, set: (value) => this.playWinner = value }]
    ]);
    makeAutoObservable(this);
    const restore = storageService.restoreObject(ConfigService.storage, {
      white: "",
      black: "",
      clock: "",
      rotation: 0,
      showHints: false,
      showCP: true,
      showFacts: true,
      playMistake: false,
      playCorrect: false,
      playWinner: false
    });
    this.humans = (restore.humans?.length ? restore.humans : Human.init).map((x2) => new Human(x2.name, x2.email));
    this.bots = (restore.bots?.length ? restore.bots : Bot.init).map((x2) => new Bot(x2.name, x2.engine, x2.skill, x2.time, x2.depth));
    this.clocks = (restore.clocks?.length ? restore.clocks : Clock.init).map((x2) => new Clock(x2.name, x2.time));
    this.white = restore.white;
    this.black = restore.black;
    this.clock = restore.clock;
    this.rotation = restore.rotation;
    this.showHints = restore.showHints;
    this.showCP = restore.showCP;
    this.showFacts = restore.showFacts;
    this.playMistake = restore.playMistake;
    this.playCorrect = restore.playCorrect;
    this.playWinner = restore.playWinner;
  }
  properties = new Map([
    ["clock", { get: () => this.clock, set: (value) => this.clock = value }],
    ["white", { get: () => this.white, set: (value) => this.white = value }],
    ["black", { get: () => this.black, set: (value) => this.black = value }]
  ]);
  store = () => storageService.storeObject(ConfigService.storage, this);
  openConfigAction = () => {
    this.showConfig = true;
    playService.isPlaying = false;
  };
  closeConfigAction = () => {
    this.showConfig = false;
    this.store();
    refreshService.startRefreshTimer();
  };
  switchTab(n8) {
    this.showTab = n8;
    this.cursor = -1;
  }
  setCursor(id) {
    const num = Number.parseInt(id);
    this.cursor = num == this.cursor ? -1 : num;
  }
  deleteItemAction = () => {
    const items = this.getItems;
    items.splice(this.cursor, 1);
    this.cursor = -1;
  };
  closePopupAction = () => {
    this.cursor = -1;
    this.listMode = ListMode.None;
  };
  set setListType(type) {
    this.listType = type;
    this.listMode = ListMode.None;
    this.newItem = this.createItem;
  }
  set setListMode(mode) {
    this.listMode = mode;
  }
  saveItem(item, items) {
    if (item.validate()) {
      messageService.display((this.isEdit ? "Save" : "Add") + this.getTitleType, item.validate());
    } else {
      this.isEdit ? items[this.cursor] = item : items.push(item);
    }
    this.closePopupAction();
  }
  get isEdit() {
    return this.listMode == ListMode.Edit;
  }
  get isAdd() {
    return this.listMode == ListMode.Add;
  }
  get getTitleType() {
    switch (this.listType) {
      case ListType.Human:
        return "Human";
      case ListType.Bot:
        return "Bot";
      default:
        return "Clock";
    }
  }
  get getItems() {
    switch (this.listType) {
      case ListType.Human:
        return this.humans;
      case ListType.Bot:
        return this.bots;
      default:
        return this.clocks;
    }
  }
  get getItem() {
    return this.isEdit ? this.getItems[this.cursor] : this.newItem;
  }
  get createItem() {
    switch (this.listType) {
      case ListType.Human:
        return Human.create();
      case ListType.Bot:
        return Bot.create();
      default:
        return Clock.create();
    }
  }
  get getR90() {
    return this.rotation % 2 == 1;
  }
  get getR180() {
    return this.rotation > 1;
  }
  rotateAction = () => this.rotation = (this.rotation + 1) % 4;
}
__decorateClass([
  $jsonIgnore()
], ConfigService.prototype, "showConfig", 2);
__decorateClass([
  $jsonIgnore()
], ConfigService.prototype, "showTab", 2);
__decorateClass([
  $jsonIgnore()
], ConfigService.prototype, "cursor", 2);
__decorateClass([
  $jsonIgnore()
], ConfigService.prototype, "listType", 2);
__decorateClass([
  $jsonIgnore()
], ConfigService.prototype, "listMode", 2);
__decorateClass([
  $jsonIgnore()
], ConfigService.prototype, "boolprops", 2);

// src/resources/library.ts
var toMMSS = (sec_num) => {
  const secs = isNaN(sec_num) ? 0 : sec_num;
  const m2 = Math.floor(secs / 60);
  const s5 = secs - m2 * 60;
  return (m2 < 10 ? "0" : "") + m2 + ":" + (s5 < 10 ? "0" : "") + s5;
};

class UtilService {
  getDeviceInfo() {
    const dev = {
      first: Date.now().toString(36),
      userAgent: navigator.userAgent,
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
    storageService.storeObject("device", dev);
    return dev;
  }
  toMMSS(sec_num) {
    const secs = isNaN(sec_num) ? 0 : sec_num;
    const m2 = Math.floor(secs / 60);
    const s5 = secs - m2 * 60;
    return (m2 < 10 ? "0" : "") + m2 + ":" + (s5 < 10 ? "0" : "") + s5;
  }
}

// src/service/analyzer.service.ts
class AnalyzerBot {
  instance;
  isRunning = false;
  constructor() {
    this.instance = this.helpWorker()();
  }
  helpWorker = () => () => {
    const worker = new Worker(Engines[0].path);
    let resolver = null;
    let cp = 0;
    let moves = [];
    worker.addEventListener("message", (e8) => {
      const s5 = e8.data.split(" ");
      if (s5[0] == "info") {
        const i1 = s5.indexOf("cp");
        if (i1 >= 0) {
          cp = Number.parseInt(s5[i1 + 1]);
        }
        const i22 = s5.indexOf("pv");
        if (i22 >= 0) {
          const pv = s5[i22 + 1];
          const pv1 = pv.substring(0, 2);
          const pv2 = pv.substring(2, 4);
          moves.push(pv1, pv2);
        }
      }
      if (s5[0] == "bestmove" && resolver) {
        resolver({
          moves: [...new Set(moves.reverse())],
          cp
        });
        moves = [];
        cp = undefined;
        resolver = null;
      }
    });
    return (fen) => new Promise((resolve, reject) => {
      if (resolver) {
        reject("Pending move is present");
        return;
      }
      resolver = resolve;
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`setoption name Skill Level value 20`);
      worker.postMessage(`go movetime 1000`);
    });
  };
  run = (fen, resolver) => {
    if (!this.isRunning) {
      this.isRunning = true;
      this.instance(fen).then((ret) => {
        resolver(ret);
        this.isRunning = false;
      });
    }
  };
}

class AnalyzerService {
  help = [];
  cp = 0;
  prevcp = 0;
  helperBot = new AnalyzerBot;
  constructor() {
    makeAutoObservable(this);
  }
  reset = () => this.help = [];
  run = (fen, isWhiteTurn) => {
    this.reset();
    this.helperBot.run(fen, ({ moves, cp }) => {
      const squares = new Set;
      moves.forEach((x2) => squares.add(x2));
      runInAction(() => {
        this.help = [...squares];
        if (cp) {
          this.prevcp = this.cp;
          this.cp = isWhiteTurn ? cp : -cp;
        }
        this.checkMistake(isWhiteTurn);
      });
    });
  };
  checkMistake = (isWhiteTurn) => {
    if (isWhiteTurn && this.cp - this.prevcp > 100 || !isWhiteTurn && this.prevcp - this.cp > 100) {
      mediaService.playMistake();
    }
  };
  getCpInfo = () => {
    const cp = this.cp;
    const blackTop = configService.rotation > 1;
    const cp2 = isNaN(cp) ? 1e4 : Math.abs(cp);
    const whiteLead = cp > 0;
    const h3 = renderingService.height - 150;
    const x2 = Math.min(h3, cp2);
    const s5 = (h3 - x2) / 2 + 75;
    const isW = whiteLead != blackTop;
    return {
      txt: `cp ${cp2} ${whiteLead ? "white" : "black"}`,
      blackTop,
      h1: (isW ? 0 : x2) + s5 + "px",
      h2: (isW ? x2 : 0) + s5 + "px"
    };
  };
}

// src/service/bluetooth.service.ts
class BluetoothService {
  btDevices = [];
  constructor() {
    try {
      const bt = navigator?.bluetooth;
      const devs = bt?.getDevices();
      devs?.then((devices) => {
        devices.forEach((device) => {
          this.btDevices.push(device);
        });
      }).catch((error) => messageService.display("Bluetooth error:", String(error)));
    } catch (error) {
      console.log("Bluetooth error:" + String(error));
    }
  }
}
var bluetoothService = new BluetoothService;

// src/service/bot.service.ts
class BotRunner {
  name;
  workerClass;
  workerInstance;
  worker;
  isRunning = false;
  constructor(name, path, skill, time, depth) {
    this.name = name;
    this.workerClass = this.createWorker(path, skill, time, depth);
  }
  createWorker = (path, skill, time, depth) => () => {
    const actions = [`setoption name Skill Level value ${skill}`];
    actions.push(time ? `go movetime ${time}000` : `go depth ${depth}`);
    const worker = new Worker(path);
    this.worker = worker;
    let uciCallback = null;
    worker.addEventListener("message", (e8) => {
      const move = e8.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
      if (move && uciCallback) {
        uciCallback({ from: move[1], to: move[2] });
        uciCallback = null;
      }
    });
    return (fen) => new Promise((callback, reject) => {
      if (uciCallback) {
        reject("Pending move is present");
        return;
      }
      uciCallback = callback;
      worker.postMessage(`position fen ${fen}`);
      actions.forEach((action2) => worker.postMessage(action2));
    });
  };
  processFen = (fen, callback) => {
    if (!this.isRunning) {
      if (!this.workerInstance)
        this.workerInstance = this.workerClass();
      this.isRunning = true;
      this.workerInstance(fen).then((move) => {
        callback(move);
        this.isRunning = false;
      });
    }
  };
}

class BotService {
  instantiate(player, current) {
    if (current instanceof BotRunner && current.name !== player?.name) {
      if (current.isRunning) {
        current.worker?.terminate();
      }
    }
    return player instanceof Bot ? new BotRunner(player.name, player.getUciEngineDef.path, player.skill, player.depth, player.time) : undefined;
  }
}

// node_modules/chess.js/dist/esm/chess.js
var rank = function(square) {
  return square >> 4;
};
var file = function(square) {
  return square & 15;
};
var isDigit = function(c3) {
  return "0123456789".indexOf(c3) !== -1;
};
var algebraic = function(square) {
  const f2 = file(square);
  const r4 = rank(square);
  return "abcdefgh".substring(f2, f2 + 1) + "87654321".substring(r4, r4 + 1);
};
var swapColor = function(color) {
  return color === WHITE ? BLACK : WHITE;
};
function validateFen(fen) {
  const tokens = fen.split(/\s+/);
  if (tokens.length !== 6) {
    return {
      ok: false,
      error: "Invalid FEN: must contain six space-delimited fields"
    };
  }
  const moveNumber = parseInt(tokens[5], 10);
  if (isNaN(moveNumber) || moveNumber <= 0) {
    return {
      ok: false,
      error: "Invalid FEN: move number must be a positive integer"
    };
  }
  const halfMoves = parseInt(tokens[4], 10);
  if (isNaN(halfMoves) || halfMoves < 0) {
    return {
      ok: false,
      error: "Invalid FEN: half move counter number must be a non-negative integer"
    };
  }
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { ok: false, error: "Invalid FEN: en-passant square is invalid" };
  }
  if (/[^kKqQ-]/.test(tokens[2])) {
    return { ok: false, error: "Invalid FEN: castling availability is invalid" };
  }
  if (!/^(w|b)$/.test(tokens[1])) {
    return { ok: false, error: "Invalid FEN: side-to-move is invalid" };
  }
  const rows = tokens[0].split("/");
  if (rows.length !== 8) {
    return {
      ok: false,
      error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows"
    };
  }
  for (let i7 = 0;i7 < rows.length; i7++) {
    let sumFields = 0;
    let previousWasNumber = false;
    for (let k2 = 0;k2 < rows[i7].length; k2++) {
      if (isDigit(rows[i7][k2])) {
        if (previousWasNumber) {
          return {
            ok: false,
            error: "Invalid FEN: piece data is invalid (consecutive number)"
          };
        }
        sumFields += parseInt(rows[i7][k2], 10);
        previousWasNumber = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i7][k2])) {
          return {
            ok: false,
            error: "Invalid FEN: piece data is invalid (invalid piece)"
          };
        }
        sumFields += 1;
        previousWasNumber = false;
      }
    }
    if (sumFields !== 8) {
      return {
        ok: false,
        error: "Invalid FEN: piece data is invalid (too many squares in rank)"
      };
    }
  }
  if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
    return { ok: false, error: "Invalid FEN: illegal en-passant square" };
  }
  const kings = [
    { color: "white", regex: /K/g },
    { color: "black", regex: /k/g }
  ];
  for (const { color, regex } of kings) {
    if (!regex.test(tokens[0])) {
      return { ok: false, error: `Invalid FEN: missing ${color} king` };
    }
    if ((tokens[0].match(regex) || []).length > 1) {
      return { ok: false, error: `Invalid FEN: too many ${color} kings` };
    }
  }
  return { ok: true };
}
var getDisambiguator = function(move, moves) {
  const from = move.from;
  const to = move.to;
  const piece = move.piece;
  let ambiguities = 0;
  let sameRank = 0;
  let sameFile = 0;
  for (let i7 = 0, len = moves.length;i7 < len; i7++) {
    const ambigFrom = moves[i7].from;
    const ambigTo = moves[i7].to;
    const ambigPiece = moves[i7].piece;
    if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
      ambiguities++;
      if (rank(from) === rank(ambigFrom)) {
        sameRank++;
      }
      if (file(from) === file(ambigFrom)) {
        sameFile++;
      }
    }
  }
  if (ambiguities > 0) {
    if (sameRank > 0 && sameFile > 0) {
      return algebraic(from);
    } else if (sameFile > 0) {
      return algebraic(from).charAt(1);
    } else {
      return algebraic(from).charAt(0);
    }
  }
  return "";
};
var addMove = function(moves, color, from, to, piece, captured = undefined, flags = BITS.NORMAL) {
  const r4 = rank(to);
  if (piece === PAWN && (r4 === RANK_1 || r4 === RANK_8)) {
    for (let i7 = 0;i7 < PROMOTIONS.length; i7++) {
      const promotion = PROMOTIONS[i7];
      moves.push({
        color,
        from,
        to,
        piece,
        captured,
        promotion,
        flags: flags | BITS.PROMOTION
      });
    }
  } else {
    moves.push({
      color,
      from,
      to,
      piece,
      captured,
      flags
    });
  }
};
var inferPieceType = function(san) {
  let pieceType = san.charAt(0);
  if (pieceType >= "a" && pieceType <= "h") {
    const matches = san.match(/[a-h]\d.*[a-h]\d/);
    if (matches) {
      return;
    }
    return PAWN;
  }
  pieceType = pieceType.toLowerCase();
  if (pieceType === "o") {
    return KING;
  }
  return pieceType;
};
var strippedSan = function(move) {
  return move.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
};
var WHITE = "w";
var BLACK = "b";
var PAWN = "p";
var KNIGHT = "n";
var BISHOP = "b";
var ROOK = "r";
var QUEEN = "q";
var KING = "k";
var DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var EMPTY = -1;
var FLAGS = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q"
};
var SQUARES = [
  "a8",
  "b8",
  "c8",
  "d8",
  "e8",
  "f8",
  "g8",
  "h8",
  "a7",
  "b7",
  "c7",
  "d7",
  "e7",
  "f7",
  "g7",
  "h7",
  "a6",
  "b6",
  "c6",
  "d6",
  "e6",
  "f6",
  "g6",
  "h6",
  "a5",
  "b5",
  "c5",
  "d5",
  "e5",
  "f5",
  "g5",
  "h5",
  "a4",
  "b4",
  "c4",
  "d4",
  "e4",
  "f4",
  "g4",
  "h4",
  "a3",
  "b3",
  "c3",
  "d3",
  "e3",
  "f3",
  "g3",
  "h3",
  "a2",
  "b2",
  "c2",
  "d2",
  "e2",
  "f2",
  "g2",
  "h2",
  "a1",
  "b1",
  "c1",
  "d1",
  "e1",
  "f1",
  "g1",
  "h1"
];
var BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64
};
var Ox88 = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119
};
var PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};
var PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1]
};
var ATTACKS = [
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  24,
  24,
  24,
  56,
  0,
  56,
  24,
  24,
  24,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20
];
var RAYS = [
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  16,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  16,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  16,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  -16,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  -16,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  -16,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  0,
  -17
];
var PIECE_MASKS = { p: 1, n: 2, b: 4, r: 8, q: 16, k: 32 };
var SYMBOLS = "pnbrqkPNBRQK";
var PROMOTIONS = [KNIGHT, BISHOP, ROOK, QUEEN];
var RANK_1 = 7;
var RANK_2 = 6;
var RANK_7 = 1;
var RANK_8 = 0;
var SIDES = {
  [KING]: BITS.KSIDE_CASTLE,
  [QUEEN]: BITS.QSIDE_CASTLE
};
var ROOKS = {
  w: [
    { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h1, flag: BITS.KSIDE_CASTLE }
  ],
  b: [
    { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h8, flag: BITS.KSIDE_CASTLE }
  ]
};
var SECOND_RANK = { b: RANK_7, w: RANK_2 };
var TERMINATION_MARKERS = ["1-0", "0-1", "1/2-1/2", "*"];

class Chess {
  _board = new Array(128);
  _turn = WHITE;
  _header = {};
  _kings = { w: EMPTY, b: EMPTY };
  _epSquare = -1;
  _halfMoves = 0;
  _moveNumber = 0;
  _history = [];
  _comments = {};
  _castling = { w: 0, b: 0 };
  constructor(fen = DEFAULT_POSITION) {
    this.load(fen);
  }
  clear(keepHeaders = false) {
    this._board = new Array(128);
    this._kings = { w: EMPTY, b: EMPTY };
    this._turn = WHITE;
    this._castling = { w: 0, b: 0 };
    this._epSquare = EMPTY;
    this._halfMoves = 0;
    this._moveNumber = 1;
    this._history = [];
    this._comments = {};
    this._header = keepHeaders ? this._header : {};
    this._updateSetup(this.fen());
  }
  removeHeader(key) {
    if (key in this._header) {
      delete this._header[key];
    }
  }
  load(fen, keepHeaders = false) {
    let tokens = fen.split(/\s+/);
    if (tokens.length >= 2 && tokens.length < 6) {
      const adjustments = ["-", "-", "0", "1"];
      fen = tokens.concat(adjustments.slice(-(6 - tokens.length))).join(" ");
    }
    tokens = fen.split(/\s+/);
    const { ok, error } = validateFen(fen);
    if (!ok) {
      throw new Error(error);
    }
    const position = tokens[0];
    let square = 0;
    this.clear(keepHeaders);
    for (let i7 = 0;i7 < position.length; i7++) {
      const piece = position.charAt(i7);
      if (piece === "/") {
        square += 8;
      } else if (isDigit(piece)) {
        square += parseInt(piece, 10);
      } else {
        const color = piece < "a" ? WHITE : BLACK;
        this.put({ type: piece.toLowerCase(), color }, algebraic(square));
        square++;
      }
    }
    this._turn = tokens[1];
    if (tokens[2].indexOf("K") > -1) {
      this._castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      this._castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      this._castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      this._castling.b |= BITS.QSIDE_CASTLE;
    }
    this._epSquare = tokens[3] === "-" ? EMPTY : Ox88[tokens[3]];
    this._halfMoves = parseInt(tokens[4], 10);
    this._moveNumber = parseInt(tokens[5], 10);
    this._updateSetup(this.fen());
  }
  fen() {
    let empty = 0;
    let fen = "";
    for (let i7 = Ox88.a8;i7 <= Ox88.h1; i7++) {
      if (this._board[i7]) {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        const { color, type: piece } = this._board[i7];
        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      } else {
        empty++;
      }
      if (i7 + 1 & 136) {
        if (empty > 0) {
          fen += empty;
        }
        if (i7 !== Ox88.h1) {
          fen += "/";
        }
        empty = 0;
        i7 += 8;
      }
    }
    let castling = "";
    if (this._castling[WHITE] & BITS.KSIDE_CASTLE) {
      castling += "K";
    }
    if (this._castling[WHITE] & BITS.QSIDE_CASTLE) {
      castling += "Q";
    }
    if (this._castling[BLACK] & BITS.KSIDE_CASTLE) {
      castling += "k";
    }
    if (this._castling[BLACK] & BITS.QSIDE_CASTLE) {
      castling += "q";
    }
    castling = castling || "-";
    let epSquare = "-";
    if (this._epSquare !== EMPTY) {
      const bigPawnSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
      const squares = [bigPawnSquare + 1, bigPawnSquare - 1];
      for (const square of squares) {
        if (square & 136) {
          continue;
        }
        const color = this._turn;
        if (this._board[square]?.color === color && this._board[square]?.type === PAWN) {
          this._makeMove({
            color,
            from: square,
            to: this._epSquare,
            piece: PAWN,
            captured: PAWN,
            flags: BITS.EP_CAPTURE
          });
          const isLegal = !this._isKingAttacked(color);
          this._undoMove();
          if (isLegal) {
            epSquare = algebraic(this._epSquare);
            break;
          }
        }
      }
    }
    return [
      fen,
      this._turn,
      castling,
      epSquare,
      this._halfMoves,
      this._moveNumber
    ].join(" ");
  }
  _updateSetup(fen) {
    if (this._history.length > 0)
      return;
    if (fen !== DEFAULT_POSITION) {
      this._header["SetUp"] = "1";
      this._header["FEN"] = fen;
    } else {
      delete this._header["SetUp"];
      delete this._header["FEN"];
    }
  }
  reset() {
    this.load(DEFAULT_POSITION);
  }
  get(square) {
    return this._board[Ox88[square]] || false;
  }
  put({ type, color }, square) {
    if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
      return false;
    }
    if (!(square in Ox88)) {
      return false;
    }
    const sq = Ox88[square];
    if (type == KING && !(this._kings[color] == EMPTY || this._kings[color] == sq)) {
      return false;
    }
    this._board[sq] = { type, color };
    if (type === KING) {
      this._kings[color] = sq;
    }
    this._updateCastlingRights();
    this._updateEnPassantSquare();
    this._updateSetup(this.fen());
    return true;
  }
  remove(square) {
    const piece = this.get(square);
    delete this._board[Ox88[square]];
    if (piece && piece.type === KING) {
      this._kings[piece.color] = EMPTY;
    }
    this._updateCastlingRights();
    this._updateEnPassantSquare();
    this._updateSetup(this.fen());
    return piece;
  }
  _updateCastlingRights() {
    const whiteKingInPlace = this._board[Ox88.e1]?.type === KING && this._board[Ox88.e1]?.color === WHITE;
    const blackKingInPlace = this._board[Ox88.e8]?.type === KING && this._board[Ox88.e8]?.color === BLACK;
    if (!whiteKingInPlace || this._board[Ox88.a1]?.type !== ROOK || this._board[Ox88.a1]?.color !== WHITE) {
      this._castling.w &= ~BITS.QSIDE_CASTLE;
    }
    if (!whiteKingInPlace || this._board[Ox88.h1]?.type !== ROOK || this._board[Ox88.h1]?.color !== WHITE) {
      this._castling.w &= ~BITS.KSIDE_CASTLE;
    }
    if (!blackKingInPlace || this._board[Ox88.a8]?.type !== ROOK || this._board[Ox88.a8]?.color !== BLACK) {
      this._castling.b &= ~BITS.QSIDE_CASTLE;
    }
    if (!blackKingInPlace || this._board[Ox88.h8]?.type !== ROOK || this._board[Ox88.h8]?.color !== BLACK) {
      this._castling.b &= ~BITS.KSIDE_CASTLE;
    }
  }
  _updateEnPassantSquare() {
    if (this._epSquare === EMPTY) {
      return;
    }
    const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16);
    const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
    const attackers = [currentSquare + 1, currentSquare - 1];
    if (this._board[startSquare] !== null || this._board[this._epSquare] !== null || this._board[currentSquare]?.color !== swapColor(this._turn) || this._board[currentSquare]?.type !== PAWN) {
      this._epSquare = EMPTY;
      return;
    }
    const canCapture = (square) => !(square & 136) && this._board[square]?.color === this._turn && this._board[square]?.type === PAWN;
    if (!attackers.some(canCapture)) {
      this._epSquare = EMPTY;
    }
  }
  _attacked(color, square) {
    for (let i7 = Ox88.a8;i7 <= Ox88.h1; i7++) {
      if (i7 & 136) {
        i7 += 7;
        continue;
      }
      if (this._board[i7] === undefined || this._board[i7].color !== color) {
        continue;
      }
      const piece = this._board[i7];
      const difference = i7 - square;
      if (difference === 0) {
        continue;
      }
      const index = difference + 119;
      if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE)
              return true;
          } else {
            if (piece.color === BLACK)
              return true;
          }
          continue;
        }
        if (piece.type === "n" || piece.type === "k")
          return true;
        const offset = RAYS[index];
        let j = i7 + offset;
        let blocked = false;
        while (j !== square) {
          if (this._board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }
        if (!blocked)
          return true;
      }
    }
    return false;
  }
  _isKingAttacked(color) {
    const square = this._kings[color];
    return square === -1 ? false : this._attacked(swapColor(color), square);
  }
  isAttacked(square, attackedBy) {
    return this._attacked(attackedBy, Ox88[square]);
  }
  isCheck() {
    return this._isKingAttacked(this._turn);
  }
  inCheck() {
    return this.isCheck();
  }
  isCheckmate() {
    return this.isCheck() && this._moves().length === 0;
  }
  isStalemate() {
    return !this.isCheck() && this._moves().length === 0;
  }
  isInsufficientMaterial() {
    const pieces2 = {
      b: 0,
      n: 0,
      r: 0,
      q: 0,
      k: 0,
      p: 0
    };
    const bishops = [];
    let numPieces = 0;
    let squareColor = 0;
    for (let i7 = Ox88.a8;i7 <= Ox88.h1; i7++) {
      squareColor = (squareColor + 1) % 2;
      if (i7 & 136) {
        i7 += 7;
        continue;
      }
      const piece = this._board[i7];
      if (piece) {
        pieces2[piece.type] = (piece.type in pieces2) ? pieces2[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(squareColor);
        }
        numPieces++;
      }
    }
    if (numPieces === 2) {
      return true;
    } else if (numPieces === 3 && (pieces2[BISHOP] === 1 || pieces2[KNIGHT] === 1)) {
      return true;
    } else if (numPieces === pieces2[BISHOP] + 2) {
      let sum = 0;
      const len = bishops.length;
      for (let i7 = 0;i7 < len; i7++) {
        sum += bishops[i7];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }
    return false;
  }
  isThreefoldRepetition() {
    const moves = [];
    const positions = {};
    let repetition = false;
    while (true) {
      const move = this._undoMove();
      if (!move)
        break;
      moves.push(move);
    }
    while (true) {
      const fen = this.fen().split(" ").slice(0, 4).join(" ");
      positions[fen] = (fen in positions) ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }
      const move = moves.pop();
      if (!move) {
        break;
      } else {
        this._makeMove(move);
      }
    }
    return repetition;
  }
  isDraw() {
    return this._halfMoves >= 100 || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
  }
  isGameOver() {
    return this.isCheckmate() || this.isStalemate() || this.isDraw();
  }
  moves({ verbose = false, square = undefined, piece = undefined } = {}) {
    const moves = this._moves({ square, piece });
    if (verbose) {
      return moves.map((move) => this._makePretty(move));
    } else {
      return moves.map((move) => this._moveToSan(move, moves));
    }
  }
  _moves({ legal = true, piece = undefined, square = undefined } = {}) {
    const forSquare = square ? square.toLowerCase() : undefined;
    const forPiece = piece?.toLowerCase();
    const moves = [];
    const us = this._turn;
    const them = swapColor(us);
    let firstSquare = Ox88.a8;
    let lastSquare = Ox88.h1;
    let singleSquare = false;
    if (forSquare) {
      if (!(forSquare in Ox88)) {
        return [];
      } else {
        firstSquare = lastSquare = Ox88[forSquare];
        singleSquare = true;
      }
    }
    for (let from = firstSquare;from <= lastSquare; from++) {
      if (from & 136) {
        from += 7;
        continue;
      }
      if (!this._board[from] || this._board[from].color === them) {
        continue;
      }
      const { type } = this._board[from];
      let to;
      if (type === PAWN) {
        if (forPiece && forPiece !== type)
          continue;
        to = from + PAWN_OFFSETS[us][0];
        if (!this._board[to]) {
          addMove(moves, us, from, to, PAWN);
          to = from + PAWN_OFFSETS[us][1];
          if (SECOND_RANK[us] === rank(from) && !this._board[to]) {
            addMove(moves, us, from, to, PAWN, undefined, BITS.BIG_PAWN);
          }
        }
        for (let j = 2;j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j];
          if (to & 136)
            continue;
          if (this._board[to]?.color === them) {
            addMove(moves, us, from, to, PAWN, this._board[to].type, BITS.CAPTURE);
          } else if (to === this._epSquare) {
            addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE);
          }
        }
      } else {
        if (forPiece && forPiece !== type)
          continue;
        for (let j = 0, len = PIECE_OFFSETS[type].length;j < len; j++) {
          const offset = PIECE_OFFSETS[type][j];
          to = from;
          while (true) {
            to += offset;
            if (to & 136)
              break;
            if (!this._board[to]) {
              addMove(moves, us, from, to, type);
            } else {
              if (this._board[to].color === us)
                break;
              addMove(moves, us, from, to, type, this._board[to].type, BITS.CAPTURE);
              break;
            }
            if (type === KNIGHT || type === KING)
              break;
          }
        }
      }
    }
    if (forPiece === undefined || forPiece === KING) {
      if (!singleSquare || lastSquare === this._kings[us]) {
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom + 2;
          if (!this._board[castlingFrom + 1] && !this._board[castlingTo] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom + 1) && !this._attacked(them, castlingTo)) {
            addMove(moves, us, this._kings[us], castlingTo, KING, undefined, BITS.KSIDE_CASTLE);
          }
        }
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom - 2;
          if (!this._board[castlingFrom - 1] && !this._board[castlingFrom - 2] && !this._board[castlingFrom - 3] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom - 1) && !this._attacked(them, castlingTo)) {
            addMove(moves, us, this._kings[us], castlingTo, KING, undefined, BITS.QSIDE_CASTLE);
          }
        }
      }
    }
    if (!legal || this._kings[us] === -1) {
      return moves;
    }
    const legalMoves = [];
    for (let i7 = 0, len = moves.length;i7 < len; i7++) {
      this._makeMove(moves[i7]);
      if (!this._isKingAttacked(us)) {
        legalMoves.push(moves[i7]);
      }
      this._undoMove();
    }
    return legalMoves;
  }
  move(move, { strict = false } = {}) {
    let moveObj = null;
    if (typeof move === "string") {
      moveObj = this._moveFromSan(move, strict);
    } else if (typeof move === "object") {
      const moves = this._moves();
      for (let i7 = 0, len = moves.length;i7 < len; i7++) {
        if (move.from === algebraic(moves[i7].from) && move.to === algebraic(moves[i7].to) && (!("promotion" in moves[i7]) || move.promotion === moves[i7].promotion)) {
          moveObj = moves[i7];
          break;
        }
      }
    }
    if (!moveObj) {
      if (typeof move === "string") {
        throw new Error(`Invalid move: ${move}`);
      } else {
        throw new Error(`Invalid move: ${JSON.stringify(move)}`);
      }
    }
    const prettyMove = this._makePretty(moveObj);
    this._makeMove(moveObj);
    return prettyMove;
  }
  _push(move) {
    this._history.push({
      move,
      kings: { b: this._kings.b, w: this._kings.w },
      turn: this._turn,
      castling: { b: this._castling.b, w: this._castling.w },
      epSquare: this._epSquare,
      halfMoves: this._halfMoves,
      moveNumber: this._moveNumber
    });
  }
  _makeMove(move) {
    const us = this._turn;
    const them = swapColor(us);
    this._push(move);
    this._board[move.to] = this._board[move.from];
    delete this._board[move.from];
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        delete this._board[move.to - 16];
      } else {
        delete this._board[move.to + 16];
      }
    }
    if (move.promotion) {
      this._board[move.to] = { type: move.promotion, color: us };
    }
    if (this._board[move.to].type === KING) {
      this._kings[us] = move.to;
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castlingTo = move.to - 1;
        const castlingFrom = move.to + 1;
        this._board[castlingTo] = this._board[castlingFrom];
        delete this._board[castlingFrom];
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castlingTo = move.to + 1;
        const castlingFrom = move.to - 2;
        this._board[castlingTo] = this._board[castlingFrom];
        delete this._board[castlingFrom];
      }
      this._castling[us] = 0;
    }
    if (this._castling[us]) {
      for (let i7 = 0, len = ROOKS[us].length;i7 < len; i7++) {
        if (move.from === ROOKS[us][i7].square && this._castling[us] & ROOKS[us][i7].flag) {
          this._castling[us] ^= ROOKS[us][i7].flag;
          break;
        }
      }
    }
    if (this._castling[them]) {
      for (let i7 = 0, len = ROOKS[them].length;i7 < len; i7++) {
        if (move.to === ROOKS[them][i7].square && this._castling[them] & ROOKS[them][i7].flag) {
          this._castling[them] ^= ROOKS[them][i7].flag;
          break;
        }
      }
    }
    if (move.flags & BITS.BIG_PAWN) {
      if (us === BLACK) {
        this._epSquare = move.to - 16;
      } else {
        this._epSquare = move.to + 16;
      }
    } else {
      this._epSquare = EMPTY;
    }
    if (move.piece === PAWN) {
      this._halfMoves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0;
    } else {
      this._halfMoves++;
    }
    if (us === BLACK) {
      this._moveNumber++;
    }
    this._turn = them;
  }
  undo() {
    const move = this._undoMove();
    return move ? this._makePretty(move) : null;
  }
  _undoMove() {
    const old = this._history.pop();
    if (old === undefined) {
      return null;
    }
    const move = old.move;
    this._kings = old.kings;
    this._turn = old.turn;
    this._castling = old.castling;
    this._epSquare = old.epSquare;
    this._halfMoves = old.halfMoves;
    this._moveNumber = old.moveNumber;
    const us = this._turn;
    const them = swapColor(us);
    this._board[move.from] = this._board[move.to];
    this._board[move.from].type = move.piece;
    delete this._board[move.to];
    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        let index;
        if (us === BLACK) {
          index = move.to - 16;
        } else {
          index = move.to + 16;
        }
        this._board[index] = { type: PAWN, color: them };
      } else {
        this._board[move.to] = { type: move.captured, color: them };
      }
    }
    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castlingTo, castlingFrom;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1;
        castlingFrom = move.to - 1;
      } else {
        castlingTo = move.to - 2;
        castlingFrom = move.to + 1;
      }
      this._board[castlingTo] = this._board[castlingFrom];
      delete this._board[castlingFrom];
    }
    return move;
  }
  pgn({ newline = "\n", maxWidth = 0 } = {}) {
    const result = [];
    let headerExists = false;
    for (const i7 in this._header) {
      result.push("[" + i7 + ' "' + this._header[i7] + '"]' + newline);
      headerExists = true;
    }
    if (headerExists && this._history.length) {
      result.push(newline);
    }
    const appendComment = (moveString2) => {
      const comment = this._comments[this.fen()];
      if (typeof comment !== "undefined") {
        const delimiter = moveString2.length > 0 ? " " : "";
        moveString2 = `${moveString2}${delimiter}{${comment}}`;
      }
      return moveString2;
    };
    const reversedHistory = [];
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    const moves = [];
    let moveString = "";
    if (reversedHistory.length === 0) {
      moves.push(appendComment(""));
    }
    while (reversedHistory.length > 0) {
      moveString = appendComment(moveString);
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      if (!this._history.length && move.color === "b") {
        const prefix = `${this._moveNumber}. ...`;
        moveString = moveString ? `${moveString} ${prefix}` : prefix;
      } else if (move.color === "w") {
        if (moveString.length) {
          moves.push(moveString);
        }
        moveString = this._moveNumber + ".";
      }
      moveString = moveString + " " + this._moveToSan(move, this._moves({ legal: true }));
      this._makeMove(move);
    }
    if (moveString.length) {
      moves.push(appendComment(moveString));
    }
    if (typeof this._header.Result !== "undefined") {
      moves.push(this._header.Result);
    }
    if (maxWidth === 0) {
      return result.join("") + moves.join(" ");
    }
    const strip = function() {
      if (result.length > 0 && result[result.length - 1] === " ") {
        result.pop();
        return true;
      }
      return false;
    };
    const wrapComment = function(width, move) {
      for (const token of move.split(" ")) {
        if (!token) {
          continue;
        }
        if (width + token.length > maxWidth) {
          while (strip()) {
            width--;
          }
          result.push(newline);
          width = 0;
        }
        result.push(token);
        width += token.length;
        result.push(" ");
        width++;
      }
      if (strip()) {
        width--;
      }
      return width;
    };
    let currentWidth = 0;
    for (let i7 = 0;i7 < moves.length; i7++) {
      if (currentWidth + moves[i7].length > maxWidth) {
        if (moves[i7].includes("{")) {
          currentWidth = wrapComment(currentWidth, moves[i7]);
          continue;
        }
      }
      if (currentWidth + moves[i7].length > maxWidth && i7 !== 0) {
        if (result[result.length - 1] === " ") {
          result.pop();
        }
        result.push(newline);
        currentWidth = 0;
      } else if (i7 !== 0) {
        result.push(" ");
        currentWidth++;
      }
      result.push(moves[i7]);
      currentWidth += moves[i7].length;
    }
    return result.join("");
  }
  header(...args) {
    for (let i7 = 0;i7 < args.length; i7 += 2) {
      if (typeof args[i7] === "string" && typeof args[i7 + 1] === "string") {
        this._header[args[i7]] = args[i7 + 1];
      }
    }
    return this._header;
  }
  loadPgn(pgn, { strict = false, newlineChar = "\r?\n" } = {}) {
    function mask(str) {
      return str.replace(/\\/g, "\\");
    }
    function parsePgnHeader(header) {
      const headerObj = {};
      const headers2 = header.split(new RegExp(mask(newlineChar)));
      let key = "";
      let value = "";
      for (let i7 = 0;i7 < headers2.length; i7++) {
        const regex = /^\s*\[\s*([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
        key = headers2[i7].replace(regex, "$1");
        value = headers2[i7].replace(regex, "$2");
        if (key.trim().length > 0) {
          headerObj[key] = value;
        }
      }
      return headerObj;
    }
    pgn = pgn.trim();
    const headerRegex = new RegExp("^(\\[((?:" + mask(newlineChar) + ")|.)*\\])((?:\\s*" + mask(newlineChar) + "){2}|(?:\\s*" + mask(newlineChar) + ")*$)");
    const headerRegexResults = headerRegex.exec(pgn);
    const headerString = headerRegexResults ? headerRegexResults.length >= 2 ? headerRegexResults[1] : "" : "";
    this.reset();
    const headers = parsePgnHeader(headerString);
    let fen = "";
    for (const key in headers) {
      if (key.toLowerCase() === "fen") {
        fen = headers[key];
      }
      this.header(key, headers[key]);
    }
    if (!strict) {
      if (fen) {
        this.load(fen, true);
      }
    } else {
      if (headers["SetUp"] === "1") {
        if (!("FEN" in headers)) {
          throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");
        }
        this.load(headers["FEN"], true);
      }
    }
    function toHex(s5) {
      return Array.from(s5).map(function(c3) {
        return c3.charCodeAt(0) < 128 ? c3.charCodeAt(0).toString(16) : encodeURIComponent(c3).replace(/%/g, "").toLowerCase();
      }).join("");
    }
    function fromHex(s5) {
      return s5.length == 0 ? "" : decodeURIComponent("%" + (s5.match(/.{1,2}/g) || []).join("%"));
    }
    const encodeComment = function(s5) {
      s5 = s5.replace(new RegExp(mask(newlineChar), "g"), " ");
      return `{${toHex(s5.slice(1, s5.length - 1))}}`;
    };
    const decodeComment = function(s5) {
      if (s5.startsWith("{") && s5.endsWith("}")) {
        return fromHex(s5.slice(1, s5.length - 1));
      }
    };
    let ms = pgn.replace(headerString, "").replace(new RegExp(`({[^}]*})+?|;([^${mask(newlineChar)}]*)`, "g"), function(_match, bracket, semicolon) {
      return bracket !== undefined ? encodeComment(bracket) : " " + encodeComment(`{${semicolon.slice(1)}}`);
    }).replace(new RegExp(mask(newlineChar), "g"), " ");
    const ravRegex = /(\([^()]+\))+?/g;
    while (ravRegex.test(ms)) {
      ms = ms.replace(ravRegex, "");
    }
    ms = ms.replace(/\d+\.(\.\.)?/g, "");
    ms = ms.replace(/\.\.\./g, "");
    ms = ms.replace(/\$\d+/g, "");
    let moves = ms.trim().split(new RegExp(/\s+/));
    moves = moves.filter((move) => move !== "");
    let result = "";
    for (let halfMove = 0;halfMove < moves.length; halfMove++) {
      const comment = decodeComment(moves[halfMove]);
      if (comment !== undefined) {
        this._comments[this.fen()] = comment;
        continue;
      }
      const move = this._moveFromSan(moves[halfMove], strict);
      if (move == null) {
        if (TERMINATION_MARKERS.indexOf(moves[halfMove]) > -1) {
          result = moves[halfMove];
        } else {
          throw new Error(`Invalid move in PGN: ${moves[halfMove]}`);
        }
      } else {
        result = "";
        this._makeMove(move);
      }
    }
    if (result && Object.keys(this._header).length && !this._header["Result"]) {
      this.header("Result", result);
    }
  }
  _moveToSan(move, moves) {
    let output = "";
    if (move.flags & BITS.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O";
    } else {
      if (move.piece !== PAWN) {
        const disambiguator = getDisambiguator(move, moves);
        output += move.piece.toUpperCase() + disambiguator;
      }
      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += "x";
      }
      output += algebraic(move.to);
      if (move.promotion) {
        output += "=" + move.promotion.toUpperCase();
      }
    }
    this._makeMove(move);
    if (this.isCheck()) {
      if (this.isCheckmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    this._undoMove();
    return output;
  }
  _moveFromSan(move, strict = false) {
    const cleanMove = strippedSan(move);
    let pieceType = inferPieceType(cleanMove);
    let moves = this._moves({ legal: true, piece: pieceType });
    for (let i7 = 0, len = moves.length;i7 < len; i7++) {
      if (cleanMove === strippedSan(this._moveToSan(moves[i7], moves))) {
        return moves[i7];
      }
    }
    if (strict) {
      return null;
    }
    let piece = undefined;
    let matches = undefined;
    let from = undefined;
    let to = undefined;
    let promotion = undefined;
    let overlyDisambiguated = false;
    matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
    if (matches) {
      piece = matches[1];
      from = matches[2];
      to = matches[3];
      promotion = matches[4];
      if (from.length == 1) {
        overlyDisambiguated = true;
      }
    } else {
      matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
      if (matches) {
        piece = matches[1];
        from = matches[2];
        to = matches[3];
        promotion = matches[4];
        if (from.length == 1) {
          overlyDisambiguated = true;
        }
      }
    }
    pieceType = inferPieceType(cleanMove);
    moves = this._moves({
      legal: true,
      piece: piece ? piece : pieceType
    });
    if (!to) {
      return null;
    }
    for (let i7 = 0, len = moves.length;i7 < len; i7++) {
      if (!from) {
        if (cleanMove === strippedSan(this._moveToSan(moves[i7], moves)).replace("x", "")) {
          return moves[i7];
        }
      } else if ((!piece || piece.toLowerCase() == moves[i7].piece) && Ox88[from] == moves[i7].from && Ox88[to] == moves[i7].to && (!promotion || promotion.toLowerCase() == moves[i7].promotion)) {
        return moves[i7];
      } else if (overlyDisambiguated) {
        const square = algebraic(moves[i7].from);
        if ((!piece || piece.toLowerCase() == moves[i7].piece) && Ox88[to] == moves[i7].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i7].promotion)) {
          return moves[i7];
        }
      }
    }
    return null;
  }
  ascii() {
    let s5 = "   +------------------------+\n";
    for (let i7 = Ox88.a8;i7 <= Ox88.h1; i7++) {
      if (file(i7) === 0) {
        s5 += " " + "87654321"[rank(i7)] + " |";
      }
      if (this._board[i7]) {
        const piece = this._board[i7].type;
        const color = this._board[i7].color;
        const symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        s5 += " " + symbol + " ";
      } else {
        s5 += " . ";
      }
      if (i7 + 1 & 136) {
        s5 += "|\n";
        i7 += 8;
      }
    }
    s5 += "   +------------------------+\n";
    s5 += "     a  b  c  d  e  f  g  h";
    return s5;
  }
  perft(depth) {
    const moves = this._moves({ legal: false });
    let nodes = 0;
    const color = this._turn;
    for (let i7 = 0, len = moves.length;i7 < len; i7++) {
      this._makeMove(moves[i7]);
      if (!this._isKingAttacked(color)) {
        if (depth - 1 > 0) {
          nodes += this.perft(depth - 1);
        } else {
          nodes++;
        }
      }
      this._undoMove();
    }
    return nodes;
  }
  _makePretty(uglyMove) {
    const { color, piece, from, to, flags, captured, promotion } = uglyMove;
    let prettyFlags = "";
    for (const flag in BITS) {
      if (BITS[flag] & flags) {
        prettyFlags += FLAGS[flag];
      }
    }
    const fromAlgebraic = algebraic(from);
    const toAlgebraic = algebraic(to);
    const move = {
      color,
      piece,
      from: fromAlgebraic,
      to: toAlgebraic,
      san: this._moveToSan(uglyMove, this._moves({ legal: true })),
      flags: prettyFlags,
      lan: fromAlgebraic + toAlgebraic,
      before: this.fen(),
      after: ""
    };
    this._makeMove(uglyMove);
    move.after = this.fen();
    this._undoMove();
    if (captured) {
      move.captured = captured;
    }
    if (promotion) {
      move.promotion = promotion;
      move.lan += promotion;
    }
    return move;
  }
  turn() {
    return this._turn;
  }
  board() {
    const output = [];
    let row = [];
    for (let i7 = Ox88.a8;i7 <= Ox88.h1; i7++) {
      if (this._board[i7] == null) {
        row.push(null);
      } else {
        row.push({
          square: algebraic(i7),
          type: this._board[i7].type,
          color: this._board[i7].color
        });
      }
      if (i7 + 1 & 136) {
        output.push(row);
        row = [];
        i7 += 8;
      }
    }
    return output;
  }
  squareColor(square) {
    if (square in Ox88) {
      const sq = Ox88[square];
      return (rank(sq) + file(sq)) % 2 === 0 ? "light" : "dark";
    }
    return null;
  }
  history({ verbose = false } = {}) {
    const reversedHistory = [];
    const moveHistory = [];
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    while (true) {
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      if (verbose) {
        moveHistory.push(this._makePretty(move));
      } else {
        moveHistory.push(this._moveToSan(move, this._moves()));
      }
      this._makeMove(move);
    }
    return moveHistory;
  }
  _pruneComments() {
    const reversedHistory = [];
    const currentComments = {};
    const copyComment = (fen) => {
      if (fen in this._comments) {
        currentComments[fen] = this._comments[fen];
      }
    };
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    copyComment(this.fen());
    while (true) {
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      this._makeMove(move);
      copyComment(this.fen());
    }
    this._comments = currentComments;
  }
  getComment() {
    return this._comments[this.fen()];
  }
  setComment(comment) {
    this._comments[this.fen()] = comment.replace("{", "[").replace("}", "]");
  }
  deleteComment() {
    const comment = this._comments[this.fen()];
    delete this._comments[this.fen()];
    return comment;
  }
  getComments() {
    this._pruneComments();
    return Object.keys(this._comments).map((fen) => {
      return { fen, comment: this._comments[fen] };
    });
  }
  deleteComments() {
    this._pruneComments();
    return Object.keys(this._comments).map((fen) => {
      const comment = this._comments[fen];
      delete this._comments[fen];
      return { fen, comment };
    });
  }
  setCastlingRights(color, rights) {
    for (const side of [KING, QUEEN]) {
      if (rights[side] !== undefined) {
        if (rights[side]) {
          this._castling[color] |= SIDES[side];
        } else {
          this._castling[color] &= ~SIDES[side];
        }
      }
    }
    this._updateCastlingRights();
    const result = this.getCastlingRights(color);
    return (rights[KING] === undefined || rights[KING] === result[KING]) && (rights[QUEEN] === undefined || rights[QUEEN] === result[QUEEN]);
  }
  getCastlingRights(color) {
    return {
      [KING]: (this._castling[color] & SIDES[KING]) !== 0,
      [QUEEN]: (this._castling[color] & SIDES[QUEEN]) !== 0
    };
  }
  moveNumber() {
    return this._moveNumber;
  }
}

// src/model/fen.ts
class FEN {
  board;
  isWhiteTurn;
  canCastleWK;
  canCastleWQ;
  canCastleBK;
  canCastleBQ;
  enPassant;
  moves;
  halfMoves;
  static NEW_GAME = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  static CLEAR_GAME = "8/8/8/8/8/8/8/8 w KQkq - 0 1";
  constructor(board, isWhiteTurn, canCastleWK, canCastleWQ, canCastleBK, canCastleBQ, enPassant, moves, halfMoves) {
    this.board = board;
    this.isWhiteTurn = isWhiteTurn;
    this.canCastleWK = canCastleWK;
    this.canCastleWQ = canCastleWQ;
    this.canCastleBK = canCastleBK;
    this.canCastleBQ = canCastleBQ;
    this.enPassant = enPassant;
    this.moves = moves;
    this.halfMoves = halfMoves;
  }
  tostring() {
    return `${FEN.brd2fen(this.board)} ${this.isWhiteTurn ? "w" : "b"} ${this.canCastleWK ? "K" : ""} ${this.canCastleWQ ? "Q" : ""} ${this.canCastleBK ? "k" : ""} ${this.canCastleBQ ? "q" : ""} ${this.enPassant ?? "_"} ${this.moves ?? "0"} ${this.halfMoves ?? "0"}`;
  }
  static create(fen) {
    const [brd, isWhiteTurn, castling, enpassant, full, half] = fen.split(" ");
    return new FEN(this.fen2brd(brd), isWhiteTurn === "w", castling.includes("K"), castling.includes("Q"), castling.includes("k"), castling.includes("q"), enpassant, Number.parseInt(full), Number.parseInt(half));
  }
  static fen2brd = (fen) => {
    const n8 = fen.indexOf(" ");
    let brd = "";
    for (let i7 = 0;i7 < n8; i7++) {
      const c3 = fen.charAt(i7);
      if (c3 == "/")
        continue;
      brd += c3 > "0" && c3 < "9" ? "        ".substring(0, Number.parseInt(c3)) : c3;
    }
    return brd;
  };
  static brd2fen = (brd) => {
    let fen = "";
    let spaces = 0;
    for (let i7 = 0;i7 < 64; i7++) {
      const c3 = brd.charAt(i7);
      if (i7 % 8 == 0 && i7) {
        if (spaces) {
          fen += spaces;
          spaces = 0;
        }
        fen += "/";
      }
      if (c3 == " ") {
        spaces++;
      } else {
        if (spaces) {
          fen += spaces;
          spaces = 0;
        }
        fen += c3;
      }
    }
    if (spaces) {
      fen += spaces;
    }
    return fen;
  };
}

// src/service/rules.service.ts
class RulesService {
  isEndMove = (san) => san == "1-0" || san == "0-1" || san == "1/2-1/2" || san?.endsWith("#");
  move = (fen2, from, to, promotion) => {
    const game = new Chess(fen2);
    const action2 = game.move({ from, to, promotion: promotion ?? QUEEN });
    return action2 ? [game.fen(), action2] : null;
  };
  newFen = (fen2, san) => {
    const game = new Chess(fen2);
    game.move(san);
    return game.fen();
  };
  replay = (moves, to) => {
    const game = new Chess(FEN.NEW_GAME);
    const n8 = to != null ? to : moves.length;
    for (let i7 = 0;i7 <= n8; i7++) {
      game.move(moves[i7]);
    }
    return game.fen();
  };
  whoWon = (game) => {
    const n8 = game.length;
    const san = game[n8 - 1];
    if (san == "1-0")
      return "White";
    if (san == "0-1")
      return "Black";
    if (san == "1/2-1/2")
      return "Draw";
    if (san?.endsWith("#"))
      return n8 % 2 == 0 ? "Black" : "White";
    return;
  };
  leftBrd = (brd) => {
    let turn = "";
    for (let i7 = 0;i7 < 64; i7++)
      turn += brd.charAt(this.leftwards(i7));
    return turn;
  };
  leftFen = (fen2) => {
    const brd = FEN.fen2brd(fen2);
    const brd2 = this.leftBrd(brd);
    return FEN.brd2fen(brd2) + fen2.substring(fen2.indexOf(" "));
  };
  leftwards = (i7) => {
    const r4 = Math.floor(i7 / 8);
    const c3 = i7 % 8;
    return (7 - c3) * 8 + r4;
  };
  rightwards = (i7) => {
    const r4 = Math.floor(i7 / 8);
    const c3 = i7 % 8;
    return c3 * 8 + (7 - r4);
  };
  leftSquare = (c3) => SQUARES[this.leftwards(SQUARES.indexOf(c3))];
  rightSquare = (c3) => SQUARES[this.rightwards(SQUARES.indexOf(c3))];
  getCastlingSquares = (fen2) => {
    const sqs = [];
    const cc = fen2.split(" ")[2];
    if (cc.includes("Q")) {
      sqs.push("a1");
    }
    if (cc.includes("K")) {
      sqs.push("h1");
    }
    if (cc.includes("q")) {
      sqs.push("a8");
    }
    if (cc.includes("k")) {
      sqs.push("h8");
    }
    return sqs;
  };
}

// src/service/connect.service.ts
class ConnectService {
  connectAction = async (human2) => {
    const games1 = historyService.getFilteredGames(human2.name);
    const connect = { email: human2.email, device: utilService, games: games1.join("\n") };
    const url = window.document.location.hostname == "http://chess.digre.com";
    await fetch(url + "/api.php", {
      method: "POST",
      body: JSON.stringify(connect),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then((resp) => resp.json()).then((resp) => this.importFromServerAction(resp)).catch((err) => messageService.display("Connect Error", err.message));
  };
  importFromServerAction = (resp) => {
    const i1 = historyService.history.length;
    historyService.importFromServer(resp.games);
    const i22 = historyService.history.length;
    messageService.display("Connect Success", `Stored ${resp.stored} games and fetched ${i22 - i1} games` + "");
  };
}

// src/service/dashboard.service.ts
class DashboardService {
  showHist = false;
  showUndo = false;
  markLog = -1;
  undopos = 0;
  constructor() {
    makeAutoObservable(this);
  }
  startUndoTimer(pos) {
    this.showUndo = true;
    this.undopos = pos;
    window.setTimeout(() => {
      runInAction(() => {
        if (this.showUndo) {
          this.undopos = 0;
        }
        this.showUndo = false;
      });
    }, 9000);
  }
  setMarkLog(n8) {
    this.markLog = n8;
  }
  toggleHistoryAction = () => {
    this.showHist = !this.showHist;
  };
}

// src/model/history.ts
class Games {
  games;
  constructor(games) {
    this.games = games;
  }
}

class History {
  id;
  date;
  white;
  black;
  wtime;
  btime;
  log;
  fen3;
  constructor(id, date, white, black, wtime, btime, log, fen3) {
    this.id = id;
    this.date = date;
    this.white = white;
    this.black = black;
    this.wtime = wtime;
    this.btime = btime;
    this.log = log;
    this.fen = fen3;
  }
  static create(txt) {
    const split = History.readHistory(txt)?.split(";");
    return split ? new History(split[0], new Date(Number.parseInt(split[0], 36)), split[1], split[2], Number.parseInt(split[3], 36), Number.parseInt(split[4], 36), split[5].split(" "), FEN.NEW_GAME) : undefined;
  }
  static readHistory = (x2) => {
    const s5 = x2.split(";");
    const date = History.readDate(s5[0]);
    if (!date)
      return;
    if (s5.length == 6) {
      return date + ";" + s5[1] + ";" + s5[2] + ";" + s5[3] + ";" + s5[4] + ";" + s5[5];
    } else if (s5.length == 4) {
      return date + ";" + s5[1] + ";" + s5[2] + ";0;0;" + s5[3];
    } else {
      console.log("Unknown format " + x2);
    }
    return;
  };
  static readDate = (x2) => {
    if (x2 == "NaN")
      return;
    const min = Date.parse("03/03/2021");
    const max = Date.now();
    let d3 = Date.parse(x2);
    if (isNaN(d3) || d3 < min || d3 > max) {
      d3 = Number.parseInt(x2) * 1000;
    }
    if (isNaN(d3) || d3 < min || d3 > max) {
      d3 = Number.parseInt(x2, 36);
    }
    if (isNaN(d3) || d3 < min || d3 > max) {
      console.log("Unknown date " + x2);
      return;
    }
    return d3.toString(36);
  };
  static oldgames = [
    "knaig7sg;Ronny;Per;1ev;1ki;d4 c5 dxc5 Nf6 b4 a5 c3 axb4 cxb4 e6 e3 Nc6 Bd2 d5 Bb5 Be7 Ne2 O-O O-O Bd7 a4 b6 Bxc6 Bxc6 cxb6 Qxb6 a5 Qa6 Nd4 Bd7 Na3 e5 b5 Qb7 Ndc2 Bxb5 Rb1 Rfb8 Rxb5 Qc7 Qe2 Ne4 Be1 Rxb5 Nxb5 Qd7 f3 Nc5 Bb4 Rb8 Nc3 d4 exd4 exd4 Rd1 d3 Qe3 Qe6 Qxe6 fxe6 Nd4 Rxb4 Nc6 Rc4 a6 Nxa6 Nxe7+ Kf7 Ne4 Kxe7 Rxd3 Nb4 Rb3 Nd5 Rb7+ Rc7 Rxc7+ Nxc7 g3 Nd5 Kf2 e5 Ke2 h5 Kd3 Ke6 Ng5+ Kf5 h4 g6 Kd2 Nf6 Ke3 Nd5+ Ke2 Nc3+ Kd3 Nb5 Ne4 Nd4 Ke3 Nc2+ 1/2-1/2",
    "knaj2f83;Ronny;Per;1o3;1yr;d4 f5 e3 Nf6 f4 b6 Nf3 Bb7 c4 g6 g3 Bg7 Bg2 O-O O-O Be4 Nc3 d5 cxd5 Bxd5 Nxd5 Nxd5 Qb3 e6 Ng5 c6 Nxe6 Qd6 Nxf8 Qxf8 Bxd5+ 1-0",
    "knanqmb1;Per;Ronny;4sq;3ck;c4 e5 Nc3 f5 Nf3 d6 d4 e4 Ng5 h6 Nh3 g5 e3 Nf6 f3 exf3 gxf3 Bg7 Bd2 O-O Rg1 c5 d5 a6 f4 g4 Nf2 Re8 h3 h5 Qc2 Qe7 Bd3 h4 hxg4 fxg4 O-O-O g3 Nfe4 Bg4 Ng5 Bxd1 Qxd1 Qd7 Rh1 Qg4 Be2 Qf5 Rxh4 b5 e4 Rxe4 Ncxe4 Nxe4 Bg4 Nf2 Bxf5 Nxd1 Kxd1 Bxb2 Rg4 Ra7 Rxg3 b4 Ne4+ Rg7 Be6+ Kf8 Rxg7 Kxg7 f5 a5 Bg5 Be5 f6+ Kg6 f7 Kg7 Bh6+ Kxh6 f8=Q+ 1-0",
    "knaqui2r;Per;Ronny;7qp;4de;d4 d5 c4 e6 Nf3 dxc4 Nc3 a6 a4 Bb4 e3 c5 Bxc4 cxd4 exd4 Nc6 O-O Nf6 Qe2 Nxd4 Nxd4 Qxd4 Bg5 Qg4 Bxf6 Qxe2 Bxe2 gxf6 Rac1 Bd7 Bf3 Bc6 Bxc6+ bxc6 Rfd1 f5 h4 Rb8 g3 Ke7 b3 Ba3 Rb1 e5 Kf1 Rhc8 Rd3 Bb4 Rc1 Bc5 Ne2 Ba3 Rc2 Bd6 f4 e4 Rdc3 c5 Nd4 cxd4 Rxc8 Rxb3 Kf2 e3+ Ke1 d3 R2c3 Bb4 Rc7+ Kf6 Rc6+ Kg7 0-1",
    "knaychuz;Per;Ronny;8rp;553;d4 d5 Nf3 f5 Bf4 e6 a4 Bd6 Ne5 Nf6 e3 O-O c4 Bb4+ Nc3 Ne4 Qb3 Bxc3+ bxc3 dxc4 Bxc4 Qe7 f3 Nd6 O-O Nxc4 Qxc4 a5 Nd3 b6 Qxc7 Qxc7 Bxc7 Ba6 Rfd1 Rc8 Bxb6 Nd7 Bxa5 Bxd3 Bb4 Bc2 Rdc1 Rxa4 Rxa4 Bxa4 c4 Bb5 c5 Kf7 Ra1 Rc7 h3 e5 d5 Nxc5 Ra5 Nd3 Rxb5 Rc1+ Kh2 h5 Rb7+ Kg6 Bf8 f4 e4 Nf2 Rxg7+ Kf6 Re7 Rh1#",
    "knbja009;Per;Ronny;og;16k;c4 e5 g3 c6 Nf3 e4 Nd4 d5 cxd5 Qxd5 e3 c5 Nc3 Qe5 Nb3 b6 Bg2 Bb7 O-O f5 Nb5 Nc6 d4 cxd4 exd4 Qxb5 d5 Nb4 d6 Rd8 Bf4 Nd3 Qe2 Bxd6 Bg5 Be7 Be3 Bc5 Bg5 Be7 Be3 Bd5 Nd4 Qxb2 Qxb2 Nxb2 Nxf5 Bf6 Bd4 Bxd4 Nxd4 Bc4 Nc6 Bxf1 Kxf1 Rd1+ Rxd1 Nxd1 Nxa7 Nf6 Nb5 Kf7 Ke2 Rd8 0-1",
    "knbl3sat;Per;Ronny;1xc;28q;d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 c6 Qc2 Na6 a3 Qe8 b4 e5 b5 cxb5 cxb5 Nc7 Bg5 e4 Bxf6 Bxf6 Nd2 Nxb5 Nxb5 Qxb5 Qc4+ Qxc4 Nxc4 d5 Nd6 Bxd4 Rad1 Bc5 Rxd5 Bxa3 f3 Be6 Rd2 Rad8 Rfd1 Bxd6 Rxd6 Rxd6 Rxd6 Bc4 fxe4 Bxe2 exf5 Rxf5 Rd7 Rf7 Bd5 1-0",
    "kn62vy6k;Per;Ronny;16;2s;e4 e5 d4 exd4 Qxd4 Nc6 1-0",
    "kngha7xw;Per;Ronny;18;11;d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 1-0",
    "kn62vy60;Per;Ronny;2;2;c4 c5 Nc3 Nc6 Nf3 g6 d4 cxd4 Nxd4 Bg7 Nxc6 bxc6 e3 Qa5 Bd2 Qb6 Na4 Qb8 Rb1 d6 c5 d5 b4 Bf5 Rb3 Be6 Rb1 d4 a3 dxe3 Bxe3 Qe5 Be2 Rd8 Qc1 Bd5 O-O Qe4 Bf3 Qc4 Bxd5 Qxd5 Rd1 Qxd1+ Qxd1 Rxd1+ Rxd1 Bb2"
  ];
}

// src/service/history.service.ts
var YESNO_BUTTONS = "";

class HistoryService {
  history;
  markHist = -1;
  constructor() {
    makeAutoObservable(this);
    this.history = this.loadHistory();
    History.oldgames.forEach((x2) => this.history.push(x2));
    const arr = this.history.map((x2) => History.create(x2)).filter((x2) => x2);
    const games = new Games(arr);
    storageService.storeObject("games", games);
  }
  storeGame() {
    this.history.push(playService.toString());
    storageService.storeLines(HistoryService.storage, this.history);
  }
  importFromServer(games) {
    const h1 = historyService.history;
    h1.push(...games.filter((x2) => !h1.includes(x2)));
    const h22 = h1.sort((n1, n22) => n1 > n22 ? 1 : n1 == n22 ? 0 : -1);
    historyService.history = h22;
    historyService.storeGame();
  }
  downloadPlayerAction = (name) => {
    const txt = [];
    this.history.forEach((line) => {
      const cols = line.split(";");
      if (cols[1] == name || cols[2] == name) {
        const time = new Date(Number.parseInt(cols[0], 36));
        cols[0] = time.toISOString();
        txt.push(cols.join(";"));
      }
    });
    return txt.join("\r\n");
  };
  getFilteredGames(name) {
    return historyService.history.filter((x2) => {
      const s5 = x2.split(";");
      return s5[1] == name || s5[2] == name;
    });
  }
  uploadHistory(file2) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = function() {
        HistoryService.upload(reader.result, historyService.history);
        historyService.storeGame();
      };
      reader.readAsBinaryString(file2);
    });
  }
  uploadFilesHistory(files) {
    if (files && files.length) {
      historyService.uploadHistory(files[0]);
    }
  }
  static upload = (text, history2) => {
    const lines = text.replace(/\r/gi, "").split("\n");
    const games = lines.map((x2) => History.readHistory(x2)).filter((x2) => x2);
    const h1 = history2;
    games.forEach((game) => {
      const key = game.split(";")[0];
      const find = h1.find((x2) => x2.split(";")[0] == key);
      if (!find)
        history2.push(game);
    });
  };
  loadHistory() {
    const h1 = storageService.restoreLines(HistoryService.storage, []);
    const h22 = h1.map((x2) => History.readHistory(x2)).filter((x2) => x2);
    h22.sort((n1, n22) => n1 > n22 ? 1 : n1 == n22 ? 0 : -1);
    return h22;
  }
  static storage = "log";
  setMarkHist(n8) {
    this.markHist = n8;
  }
  decodeGame(row) {
    const cols = row.split(";");
    let time = "?";
    const date = new Date(Number.parseInt(cols[0], 36));
    const t1 = date.getTime();
    const t22 = Date.now();
    try {
      time = t22 - t1 < 86400000 && t1 < t22 ? date.toTimeString().split(" ")[0] : date.toISOString().split("T")[0];
    } catch (error) {
      console.log(error);
    }
    const moves = cols[cols.length - 1].split(" ");
    return {
      moves,
      time,
      win: rulesService.whoWon(moves)?.substring(0, 1) ?? "?",
      c1: cols[1].split(" ")[0],
      c2: cols[2].split(" ")[0]
    };
  }
  getGames() {
    return this.history.filter((x2) => x2.split(";").length > 5).map((x2) => this.decodeGame(x2));
  }
  enterLogCheck() {
    if (historyService.markHist >= 0) {
      if (playService.isComplete || playService.log.length == 0) {
        messageService.display("Load game", "Do you want to look at this game?", YESNO_BUTTONS(), (reply) => {
          if (reply == "Yes") {
            playService.loadGame();
          }
          messageService.clear();
        });
      } else {
        messageService.display("Load game", "You have to end current game to load previous games", OK_BUTTON());
      }
      historyService.setMarkHist(-1);
    }
  }
  getLogRows() {
    const rows = [];
    const log = playService.log;
    for (let i7 = 0;i7 < log.length / 2; i7++) {
      rows[i7] = ["", ""];
    }
    log.forEach((t5, i7) => {
      const l6 = Math.floor(i7 / 2), c3 = i7 % 2;
      rows[l6][c3] = t5;
    });
    return rows;
  }
}

// src/service/message.service.ts
class MessageService {
  title;
  msg;
  buttons;
  response;
  show = false;
  constructor() {
    makeAutoObservable(this);
  }
  clear() {
    this.title = undefined;
  }
  display = (title, msg, buttons, response) => {
    this.title = title;
    this.msg = msg;
    this.buttons = buttons;
    this.response = response ?? (() => this.clear());
  };
  onClose(html) {
    this.response && this.response(html);
  }
}

// src/service/media.service.ts
class MediaService {
  title;
  msg;
  show = false;
  prev = 0;
  sound_move = new Audio("/mp3/move1.mp3");
  sound_click = new Audio("/mp3/click.mp3");
  sound_error = new Audio("/mp3/buzzer.mp3");
  constructor() {
    makeAutoObservable(this);
  }
  soundMove() {
    this.sound_move.play().then();
  }
  soundClick() {
    this.sound_click.play().then();
  }
  soundError() {
    this.sound_error.play().then();
  }
  clear() {
    this.title = "";
  }
  display(title, msg) {
    this.title = title;
    this.msg = msg;
  }
  playRandom(enable, title, emos) {
    if (enable)
      this.play(emos[Math.floor(Math.random() * emos.length)], title);
  }
  play(emo, title) {
    window.setTimeout(() => this.clear(), (emo.length ?? 10) * 1000 + 1000);
    this.display(title, emo);
  }
  playWinner() {
    this.playRandom(configService.playWinner, "Winner", this.winner_urls);
  }
  playCorrect() {
    this.playRandom(configService.playCorrect, "Stockfish would do the same", this.correct_urls);
  }
  playMistake() {
    this.playRandom(configService.playMistake, "Mistake", this.mistake_urls);
  }
  playAllAction = () => {
    this.prev++;
    const all_urls = [...this.winner_urls, ...this.correct_urls, ...this.mistake_urls];
    if (this.prev == all_urls.length)
      this.prev = 0;
    const emo = all_urls[this.prev];
    this.play(emo, "Url:" + emo.src);
  };
  winner_urls = [
    { src: "/mp4/win1.mp4", width: 640, height: 360, length: 22 },
    { src: "/mp4/win2.mp4", width: 360, height: 360, length: 30 },
    { src: "/mp4/win3.mp4", width: 700, height: 360, length: 11 },
    { src: "/mp4/win4.mp4", width: 540, height: 360, length: 3 }
  ];
  correct_urls = [
    { src: "/mp4/yes1.mp4", width: 700, height: 270, length: 1 },
    { src: "/mp4/yes2.mp4", width: 700, height: 358, length: 1 },
    { src: "/mp4/yes3.mp4", width: 640, height: 360, length: 2 },
    { src: "/mp4/yes4.mp4", width: 360, height: 360, length: 8 },
    { src: "/mp4/yes5.mp4", width: 480, height: 360, length: 4 }
  ];
  mistake_urls = [
    { src: "/mp4/no1.mp4", width: 360, height: 360, length: 13 },
    { src: "/mp4/no2.mp4", width: 638, height: 266, length: 1 },
    { src: "/mp4/no3.mp4", width: 638, height: 266, length: 1 },
    { src: "/mp4/no4.mp4", width: 640, height: 360, length: 5 }
  ];
}

// src/resources/openingdata.ts
var moves = `
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 c6 d5 Ng4 Bg5 f6 Bh4 h5/King's Indian/Gligoric-Taimanov system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Nc6 Nc3 e6 Bf4 Nxe5/Neo-Gruenfeld, 6.O-O, main line/
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 f4 f5 Nh3 Nf6 O-O O-O/English/closed system
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Bd3 Bb7 O-O Nbd7 b4/QGA/Alekhine defence
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 O-O Rc1 Qa5 Nf3 e6/Gruenfeld/exchange variation
d4 f5 g3 Nf6 Bg2 d6 Nf3 g6 O-O Bg7 c4 O-O Nc3 Qe8 d5 a5 Ne1 Na6 Nd3 Bd7/Dutch defence/
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Bd3 Nf6 h3 Be7 O-O O-O c3 Nbd7 Bc2 b6 d4 Bb7/Petrov's defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Nxd4 Bxd4 Bd7/Sicilian/Sozin, Leonhardt variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 Bxb4 cxb4 O-O a5 a3 Na6 Re1/Queen's Indian/Capablanca variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Bd6 b4 dxc4 Bxc4 a5/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 Nbd7 Bd3 h6 Bh4 O-O O-O c5/Queen's Indian/Petrosian system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 Qc7 Bd3 g6 Nf3 Nbd7 O-O Bg7 Qe1 e5/Sicilian/Najdorf, 6.f4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Bg7 Nc2 d6 Be2 f5 exf5 Bxf5 Nc3 Nf6 O-O O-O/Sicilian/accelerated fianchetto, Maroczy bind, 5...Bg7
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 Bf5 Nbd2 Qa5 Qe1 Nd7/Neo-Gruenfeld, 6.O-O c6/
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 a3 Bxc3+ bxc3 b6 Qg4 Ng6 h4 h5 Qg3 Ba6 Bd3 Bxd3/French/Winawer, advance variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bb5+ Nfd7 f5 O-O fxe6 Ne5 exf7+ Rxf7/Sicilian/Scheveningen, 6.f4
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O d6 Re1 Bd7 c3 Be7 d4 O-O Ba4 Nbd2 Bf8 a3 g6/Ruy Lopez/Berlin defence, 4.O-O, d6
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 Nf4 Be3 Nc6 cxd5 Nxd5/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O d5 Bb4 Bd2 c6 O-O/Queen's Indian/anti-Queen's Indian system
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 c6 e3 Bg4 h3 Bxf3 Qxf3 Qb6 Bd3 Qxb2/Gruenfeld/5.Bf4
Nf3 d5 g3 Nc6 Bg2 e5 d3 Nf6 O-O Be7 c3 a5 Qc2 O-O a4 h6 e4 dxe4 dxe4 Be6/Reti/King's Indian attack (Barcza system)
e4 d5 exd5 Nf6 d4 Bg4 Be2 Bxe2 Qxe2 Qxd5 Nf3 e6 O-O Nc6 Nc3 Qh5 Bf4 O-O-O Rfd1 Bd6/Scandinavian defence/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Qe2 Be7 Rd1 Nc5/Ruy Lopez/open, Howell attack
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 Bxb4 cxb4 O-O O-O Qb3/Queen's Indian/Capablanca variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qxd7+ Nbxd7 Nb5 O-O cxd5 Nxd5/Queen's Indian/Petrosian system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 e5 d5 Na6/King's Indian/Averbakh system
Nf3 d5 b3 Nf6 Bb2 Bf5 e3 e6 Be2 Bd6 O-O Nbd7 d3 h6 Nbd2 c4 c6/Reti/Nimzovich-Larsen attack
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Nc6 a3 O-O/QGA/classical variation
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 cxd4 exd4 Nc6 O-O Be7 Rd1 O-O a3/QGA/classical variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 e5 dxe5 Nfd7 Bb2 dxe5 e4 Nc6 Nc3 Nd4/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Qb3 c5 d5 Bxf3/Gruenfeld defence/Smyslov, Yugoslav variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 cxd4 Nxd4 Qb6 Nc2 d5 O-O Be7 cxd5 Nxd5 e4 Ndb4/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 Re8 Bd2 Bc5/Ruy Lopez/closed, anti-Marshall 8.a4
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8 Nc3 a5 h3 a4/Ruy Lopez/Berlin defence, open variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bxf6 Qxf6 a3 Bxc3+ Qxc3 c6 e3 Bf5/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Nb6 e3 Bg4 Be2 N8d7 O-O e5/Gruenfeld/Three knights variation
d4 Nf6 Nf3 g6 Bf4 Bg7 Nbd2 O-O e3 d6 h3 c5 c3 cxd4 cxd4/King's Indian/London system
c4 g6 e4 e5 d4 Nf6 Nf3 exd4 e5 Bb4+ Bd2 Qe7/English/Adorjan defence
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3d6 Qf4/Queen's Indian/Capablanca variation
d4 Nf6 Nf3 d5 c4 e6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 Qxc4 Qc2 Bb7 Bd2 Be4/Catalan/closed, 5.Nf3
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ c6 cxd5 Nxd5 Nxd5 Bxg5 Nc3 O-O/Queen's Indian/Petrosian system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 Nbd2 Bf5 b3 Ne4 Bb2 Nd7 Nh4 Nxd2/Neo-Gruenfeld, 6.O-O c6/
c4 c5 Nf3 Nf6 g3 b6 Bg2 Bb7 O-O g6 Nc3 Bg7 d4 Ne4 Nxe4 Bxe4 d5 O-O/English/symmetrical variation
c4 c6 e4 d5 exd5 cxd5 d4 Nf6 Nc3 e6 Nf3 Nc6 cxd5 Nxd5 Bd3 Be7 O-O O-O Re1 g6/Caro-Kann/Panov-Botvinnik attack, 5...e6
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Bd7 Be2 Nge7 Na3 cxd4 cxd4 Nf5 Nc2 Qb6/French/advance, Euwe variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 Bd7 Bd3 Na6/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Be2 Be7 O-O O-O Ndb5 a6 Bxf6 Bxf6/Sicilian/Richter-Rauzer, 6...e6
c4 e5 Nc3 Nc6 Nf3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nb6 O-O Be7 d3 O-O/English/four knights, kingside fianchetto
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 Nb3 Be3/Sicilian/Scheveningen, 6.f4
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Bg5 Bf5 e3 Nbd7 Bd3 Bxd3 Qxd3 Be7 Rb1 O-O/Queen's gambit declined/
c4 e5 g3 c6 Nf3 e4 Nd4 d5 cxd5 Qxd5/English opening/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 e3 Nc6 Nf3 d5 a3 Qa5 Nd2 Be7/Nimzo-Indian/classical, Pirc variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 f4 b5 Nf3/Sicilian/Taimanov variation
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6 e5 Qe7 Qe2 Nd5 Nd2 Nb6 c4 Bb7 b3 O-O-O/Scotch/Mieses variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Bg4 e3 Nc6 h3 Bxf3 Qxf3 Nb6/Gruenfeld/Three knights variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nb3 e6 O-O Be7 Kh1 Qc7 f4 a6/Sicilian/Sozin, Benko variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O h5 h3 Bd6 f4 Bc5/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 a3 Bxc3+ Qxc3 dxc4 Qxc4 b6 Nf3Ba6 Qc2 Nbd7 g3/Nimzo-Indian/classical, Noa variation, 5.a3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e5 Nf3 Qc7 Bd3 O-O Be6 Qe2 b5/Sicilian/Najdorf, 6.f4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 d6 f3 Bd7 Qe2 O-O O-O-O Qa5/Sicilian/accelerated fianchetto, modern variation with Bc4
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Rb1 b6 Bb5+ Bd7/Gruenfeld/exchange variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 Nbd7 Qc2 a6 O-O-O e5 d5 Qe7/King's Indian/Averbakh system
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Nc6 d5 Ne5 Nxe5 dxe5 b4 e4/Dutch/Leningrad, main variation with Nc6
d4 d6 e4 Nf6 Nc3 g6 g3 Bg7 Bg2 O-O Nge2 Nbd7 O-O e5 b3 exd4 Nxd4 Re8 Bb2 Nc5/Pirc/Sveshnikov system
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d3 d6 c3 g6 O-O Bg7 Nbd2 O-O Re1 Nd7 Nf1 Nb6/Ruy Lopez/Anderssen variation
d4 d5 c4 e6 Nf3 c6 e3 f5 Be2 Nf6 O-O Bd6 b3 Nbd7 Ba3 Bxa3 Nxa3 O-O Nc2 Ne4/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 Nc6 Qd2 O-O Bc4 Nd7 Bb3 Nde5/Sicilian/dragon, Yugoslav attack, 9.Bc4
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Qa5 Bd2 Qa4 Qg4 Qd1 b6 h4 h5/French/Winawer, advance variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Nbd7 O-O Qb6 Be3 Qxb2 Ndb5/Sicilian/Scheveningen, 6.f4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 Nbd2 O-O b3 a5 a4 Na6 Ba3 Re8 c3 Bf5/King's Indian/fianchetto without c4
Nf3 d5 g3 Nf6 Bg2 c6 O-O Bf5 b3 e6 Bb2 Be7 d3 h6 Nbd2 Bh7 Re1 O-O e4 a5 a4 Na6 e5 Nd7/Reti/King's Indian attack (Barcza system)
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 c5 dxc5 Qa5 e5 Nh5 Be3 Rd8/Gruenfeld/5.Bf4
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 Be7 Ne5 c5 dxc5 Bxc5 Nxc4 O-O/Queen's pawn game/
e4 c5 Nf3 d6 Bb5+ Nc6 O-O Bd7 c3 Nf6 Re1 a6 Ba4 e5 h3 Be7 d4 b5 Bc2 exd4/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
Nf3 g6 e4 Bg7 d4 d6 Nc3 Nf6 h3 O-O Be3 c6 a4 Qc7 Qd2 Nbd7 Be2 e5 dxe5 dxe5/Pirc/classical, h3 system
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 cxd4 cxd4 Be7 Bg5 O-O Qd3 Qb6 Nbd2 h6/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Rg1 Rg3/Sicilian/Scheveningen, Keres attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 Nbd2 O-O c4 Ne4 e3 Nxd2 Be6 Qe2/King's Indian/fianchetto without c4
d4 Nf6 Nf3 d5 c4 dxc4 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Bb7 Nbd2 O-O/QGA/classical variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O Bd6 h3 Be5 Nde2/Sicilian/Taimanov variation
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 Nf6 Qe2 cxd4 exd4 Be7 O-O O-O Nc3 a6 Bg5 b5/QGA/classical variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be3 e5 Ndb5 a6 Na3 b5 Nd5 Nxd5 exd5 Nb8/Sicilian/
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 Nc6 g3 Bc5 Nb3 Bb4 Bg2 d5 cxd5 Nxd5/English/symmetrical variation
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O O-O e4 b5 Bd3 e5/QGA/classical variation
d4 Nf6 Nf3 e6 Bg5 c5 c3 cxd4 cxd4 Qb6 Qc1 Nc6 e3 Be7 Nc3 O-O Be2 h6 Bh4 d6/Queen's pawn/Torre attack
e4 c5 d3 g6 g3 Bg7 Bg2 Nc6 f4 d6 Nf3 e6 O-O Nge7 c3 O-O Be3 b6 Bf2 Bb7/Sicilian defence/
d4 Nf6 Nf3 e6 Bg5 c5 e3 Qb6/Queen's pawn/Torre attack
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 a4 Nc6 Qe2 cxd4 Rd1 Be7/QGA/classical, Rubinstein variation
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 b6 cxd5 Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1 Bb7/QGD/4.Bg5 Be7
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 a3 Nc6 Rd1 Be7/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 d5 a3 Bxc3+ Nxc3 cxd4 exd4 dxc4 Bxc4 O-O/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Qa5 Bd2 Nxc5 f3/Nimzo-Indian/classical, 4...c5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 Nbd2 O-O c4 Bf5 b3 Qa5 Bb2 Ne4 a3 Nd7/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e5 Nf3 h6 O-O Be7 Re1 O-O Nd5 Be6/Sicilian/Sozin, not Scheveningen
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Qd2 Be7 f3 O-O g4 a6 O-O-O Nxd4/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 h3 Bg7 e4 O-O Bd3 Nh5 O-O a6/Benoni defence/
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qd3 Bb7 Bg2 Nbd7 O-O a6 Nc3 c5/Queen's gambit declined/
d4 d6 e4 g6 f4 Nf6 e5 Nd5 c4 Nb6 Nc3 dxe5 fxe5 c5 d5 Bg7 Bf4 O-O Qd2 e6/Alekhine's defence/four pawns attack, fianchetto variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g3 e5 Nde2 Be6 Bg2 Be7 O-O O-O h3 Rc8/Sicilian/
d4 Nf6 c4 d6 Nc3 Nbd7 e4 e5 d5 Nc5 f3 a5 Be3 Be7 Qd2 O-O Be2/Old Indian defence/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 Rb8 Qxc4 b5 Qd3 Bb7 O-O c5/Queen's gambit declined/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 Qxd8 Rxd8 Bxc5 Nc6 Ba3 b6/King's Indian/Saemisch, 5...O-O
c4 e6 Nf3 d5 g3 Nf6 Bg2 dxc4 Qa4+ Nbd7 Qxc4 c5 O-O b6 Nc3 Bb7/English/Neo-Catalan accepted
e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bb6 a4 a6 O-O d6 c3 Nf6 d3 O-O Be3 Bxe3 fxe3 Be6/Evans gambit declined, 5.a4/
d4 f5 Bg5 Nf6 Bxf6 exf6 e3 d5 c4 c6 Nc3 Be6 cxd5 cxd5 Qb3 Qd7 Nge2 g5 g3 Nc6/Dutch, 2.Bg5 variation/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Qe2 Ne5/Sicilian/Sozin, 7.Be3
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nc3 Rb8 Ne5 Na5 e4 b5/Catalan/open, 5.Nf3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O Qb6 Nb3 Bd7 Kb1 Rc8/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Be3 Be7 Qf3 O-O O-O-O Qc7 Kb1/Sicilian/Scheveningen, Tal variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Qb6 Nb3 Nf6 Nc3 e6 Bd3 d6 Qe2 Be7 f4 a6 Bd2 Qc7/Sicilian defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O Be6 f4 Qc7 g4 h6/Sicilian/Najdorf, Opovcensky variation
b4 e5 Bb2 Bxb4 Bxe5 Nf6 c4 O-O Nf3 Nc6 Bb2 d5 cxd5 Qxd5 Bxf6 gxf6/Polish (Sokolsky) opening/
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 exd4 Qxd4 Nf6 Qxd8+ Kxd8 Nc3 Be6 Nd4 Ke7/QGA/3.e4
Nf3 d5 g3 c5 Bg2 Nc6 d3 e6 O-O Bd6 e4 Nge7 Nbd2 O-O Re1 Bc7 c3 a5 a4 b6/Reti/King's Indian attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 Nc3 h3 exd4 Nxd4 a5/King's Indian/fianchetto without c4
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 a3 Be7 Nf3 O-O Bd3 dxc4 Bxc4 b6 O-O Bb7/Caro-Kann/Panov-Botvinnik attack, 5...e6
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Qh4/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Rg1 d5 exd5 Nxd5 Nxd5 Qxd5/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e5 dxe5 Ng4 Bf4 Nc6 Nf3 Bb4+ Nc3 Bxc3+ bxc3 f6 exf6 Nxf6 Qd3 d6/Budapest/Rubinstein variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 e5 Nb3 d5 Bg5 Be6 exd5 Qxd5 Nc3 Bb4 Bd2 Qd7/Sicilian/Prins (Moscow) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 Nf6 O-O Be7 Be3 O-O f4 Bd7 Qe1 Qc7/Sicilian/modern Scheveningen, main line
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Qe2 b5 Bd3 exd4 Bb7 a4 bxa4/QGA/classical, 7...b5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nc6 d5 Na5 e4 c6 Na3 Bd7 Rb1 cxd5/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 O-O Nf3 d5 O-O dxc4 Bxc4 Nbd7 Qe2 b6 Rd1 cxd4/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 Bg4 Bxc4 Nfd7 Be3 Nb6 Be2 e6/Gruenfeld/5.Bf4
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 Be7 Qxc4 b5 Qd3 Bb7 O-O O-O/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O Qd6 Na3 b5 c3 Ne7 d4 exd4 cxd4 Ng6 Nc2 Be7/Ruy Lopez/exchange, Bronstein variation
c4 Nf6 Nc3 d5 cxd5 Nxd5 Nf3 g6 Qa4+ c6 Qd4 Nf6 Qxd8+ Kxd8 e4 Bg7 d4/English/Anglo-Gruenfeld defense
e4 c6 d4 d5 e5 Bf5 Nc3 h5 Bd3 Bxd3 Qxd3 e6 Nf3 Qb6 O-O Qd1 Nd7 Ne2 Ne7/Caro-Kann/advance variation
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Be6 Ne2 Qd7/QGA/3.e4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 a3 Bxc3+ Qxc3 dxc4 Qxc4 b6 Nf3O-O Bg5 Ba6 Qc2 Nbd7/Nimzo-Indian/classical, Noa variation, 5.a3
e4 e5 Nf3 Nc6 d4 exd4 Bc4 Nf6 O-O Bc5 e5 d5 exf6 dxc4 fxg7Rg8 Bg5 Be7 Bxe7 Kxe7/two knights/Max Lange attack
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Rb8 Qe2 b5 Rd1 Bd7 Nc3 Bb4/Catalan/open, 5.Nf3
e4 e5 Nf3 Nf6 Nxe5 d6 Nc4 Nxe4 Nc3 Nxc3 bxc3 Be7 d4 O-O Bd3 Nd7 O-O Nb6 Ne3 d5/Petrov/Paulsen attack
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 c6/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 d6 e4 Nf6 Nc3 e5 Nf3 Nbd7 Bc4 Be7 O-O O-O Qe2 c6 a4 Rd1 Nb6 Bb3 Bg4/Philidor/Improved Hanham variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 Bd3 Nf6 O-O Bd6 Nxc6 dxc6 f4 e5/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Nge2 c5 d5 b5 Qd2/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Bd7 f3 Rc8 Bb3 g6 Be3 Bg7 Qd2 h5/Sicilian/Sozin, not Scheveningen
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 Nbd7 Bd3 O-O Nge2c6 O-O Re8 f3 Nf8/QGD/exchange, positional line
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O b5 Nxc6 Qxc6 a3 Bb7/Sicilian/Taimanov variation
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 O-O e3 h6 Bh4 b6 Be2 Bb7 Bxf6 Bxf6 cxd5 exd5/QGD/Tartakower (Makagonov-Bondarevsky) system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e5 Nde2 Be7 Bg2 O-O O-O b5 a4 b4/Sicilian/Najdorf, Zagreb (fianchetto) variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 dxe5 dxe5 Nbd2 b6 b3 Bb7/King's Indian/fianchetto without c4
d4 Nf6 Nf3 e6 g3 b5 Qd3 Ba6 e4 c5 Bg5 Qa5+ Qd2 Qxd2+ Nbxd2Be7 e5 Nd5 Bxe7 Kxe7/Queen's pawn game/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Qe2 b5 Bd3 cxd4 exd4 Nc6/QGA/classical, 7...b5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nc6 Nc3 e5 dxe5 dxe5 h3 Qe7 Bg5 Rd8/King's Indian/fianchetto without c4
d4 e6 c4 f5 g3 Nf6 Bg2 d5 Nf3 c6 O-O Bd6 b3 Qe7 Bb2 O-O Qc1 Bd7 Ba3 Be8/Dutch defence/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 Re8 Nc3 b4/Ruy Lopez/closed, anti-Marshall 8.a4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e6 Bd3 b5 e5 dxe5 fxe5 Nd5 Qg4 h5/Sicilian/Najdorf, 6.f4
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qb3 dxc4 Qxc4 O-O e3 Bb7/Queen's Indian/Petrosian system
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 c5 c3 cxd4 cxd4 Bb4+ Nbd2 d5 O-O Nbd7 Ne5 O-O/Queen's pawn game/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Bd7 Na3 Naxc4 Nxd4 Be3 Nc6/Catalan/open, 5.Nf3
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Nbd7 Nc3Nb6 Qb3/Queen's pawn game/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Qb6 Nb3 e6 Be3 Qc7 f4 Be7 Bd3 O-O/Sicilian/Sozin, Benko variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 a5 a4 Na6 Bb2 c6 Nbd2 d5 Ne5 Bf5/King's Indian/fianchetto without c4
e4 c5 Nf3 a6 c3 d5 exd5 Qxd5 d4 Nf6 Be2 e6 O-O Nc6 Be3 cxd4 Nxd4 Nxd4 Bxd4 Bc5/Sicilian/O'Kelly variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Bg5 Na6 Nbd2 Be7 c3 e3 Qb6 Qb1 h6/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bf4 Qc2 c5 dxc5 bxc5/Queen's Indian/Yates variation
e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2 cxd4 cxd4 Qb6 Nf3 f6 exf6 Nxf6 O-O Bd6 Nc3 O-O/French/Tarrasch, closed variation, main line
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 Nbd7 Bc4 Qa5 Qd2 e6 O-O Be7 Rad1 h6/Sicilian/Najdorf, 6.Bg5
e4 c5 Nf3 d6 Bb5+ Nc6 O-O Bd7 Re1 Nf6 c3 a6 Ba4 c4 Na3 b5 Bc2 Bg4 h3 Bh5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 c5 Nf3 Nc6 Bb5 d6 O-O Bd7 Re1 Nf6 c3 a6 Ba4 c4 Na3 b5 Bc2 e5 b3 cxb3/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
e4 d6 d4 Nf6 Nc3 c6 Nf3 Bg4 h3 Bh5 g4 Bg6 Qe2 e6 h4 h5 g5 Nfd7 Bf4 Be7/Pirc/Ufimtsev-Pytel variation
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Nb4 Be4 c6 Nbc3 Be6 Be3 N6d5/QGA/3.e4
e4 e6 d4 d5 Nc3 Nf6 Bg5 dxe4 Nxe4 Nbd7 Nxf6+ Nxf6 Nf3 h6 Bh4 c5 Bc4 cxd4 O-O Be7/French/Burn variation
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 Bg5 Nc6 Qd2 h6 Bh4 g5 Bg3 Nc3 Nh5 Nd5 Bg7/Sicilian, Chekhover variation/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 Be7/Sicilian/Taimanov variation
c4 c6 Nf3 d5 g3 Nf6 Bg2 g6 b3 Bg7 Bb2 O-O O-O Bg4 d3 Nbd7/English/Caro-Kann defensive system
d4 Nf6 c4 e6 Nf3 c5 d5 d6 Nc3 exd5 cxd5 g6 e4 a6 a4 Bg4 h3 Bxf3 Qxf3 Bg7/Benoni/classical with e4 and Nf3
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 c4 Be7 cxd5 Nxd5 O-O O-O b3 Bf6 Bb2 Qa5/Queen's pawn game/
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 e6 Bxc4 exd5 Nxd5 Nxd5 Bxd5Be7 Qh5 O-O Nf3 Nd7/QGA/3.e4
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Bc4 Ngf6 Ng5 e6 Qe2 Nb6 Bd3 Be7 N1f3 h6 Ne4 Nxe4/Caro-Kann/Steinitz variation
d4 e6 c4 f5 Nf3 Nf6 g3 d5 Bg2 c6 O-O Bd6 Bf4 Bxf4 gxf4 Nbd7 e3 O-O Ne5 Nxe5/Dutch defence/
e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7 h3 Nf6 Nc3 Nd7 Be3 e5 Qd2 h6 Nh2 Qe7/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 Nc6 a3 b6 Rd1 Bb7 e4 Nh5/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Bd3 Bg7 Nge2 O-O Ng4 h3 Ne5/Benoni/6.e4
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Qc2 Nh5 Bxe7 Qxe7 O-O-O Nb6/QGD/exchange, positional line
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 Rc1 c5 d5 exd5/Queen's Indian/old main line, 7.Nc3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 a6 f4 O-O O-O Kh1 d5/Sicilian/Sozin, Leonhardt variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Nd5 Bxb4 Nxb4 O-O Rb8 Na3 a6/Catalan/open, 5.Nf3
e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 f4 a6 Nf3 dxc5 Nxc5 Bd3 b5/French/classical, Steinitz variation
c4 Nf6 Nc3 e6 e4 c5 e5 Ng8 d4 cxd4 Qxd4 Nc6 Qe4/English/Mikenas-Carls, Sicilian variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Nc6 Be3 e5 Nb3 exf4/Sicilian/modern Scheveningen, main line
e4 c5 Nc3 Nc6 Nge2 a6 g3 Nf6 Bg2 e6 O-O Be7 d3 Qc7 f4 d6 h3 b5 a3 Bb7/Sicilian/chameleon variation
e4 c5 Ne2 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g3 g6 Bg2 Nxd4 Qxd4 Bg7 O-O O-O Qd1 Bg4/Sicilian/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Qa5 Bd2 Nxc5 Rd1 Bxc3 Bxc3 Qa4 Qxa4 Nxa4/Nimzo-Indian/classical, 4...c5
e4 e6 d4 d5 Nd2 c5 Ngf3 Nc6 Bb5 cxd4 Nxd4 Bd7 Nxc6 Bxc6 Bxc6+ bxc6/French/Tarrasch, open variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bd3 Nc6 Nf3 O-O O-O Nb4 e5 Nfd5/Sicilian/Scheveningen, 6.f4
d4 f5 c4 Nf6 g3 g6 Bg2 Bg7 Nc3 Nc6 Nf3 d6 d5 Ne5 Nxe5 O-O O-O Qb3 e6/Dutch/Leningrad variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Bc4 Nc6 Qd2 Bd7 O-O-O Rc8/Sicilian/dragon, Yugoslav attack, 10.O-O-O
d4 f5 Nf3 Nf6 g3 g6 Bg2 Bg7 O-O O-O c4 d6 Nc3 Nc6 d5 Na5 Qd3 c5 b3 Bd7/Dutch/Leningrad, main variation with Nc6
d4 f5 g3 Nf6 Nf3 e6 Bg2 d5 c4 c6 Qc2 Bd6 Bf4 O-O Nbd2 gxf4 b6 e3 Bb7/Dutch defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Be3 Nc6 Qe1 Qc7/Sicilian/Scheveningen, classical main line
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 a4 a6 dxe5 dxe5 a5/King's Indian/fianchetto without c4
Nf3 f5 c4 e6 g3 Nf6 Bg2 c6 O-O d5 d4 Be7 b3 O-O Ba3 Bxa3 Nxa3 Qe7 Qc1 Bd7/Dutch/stonewall with Ba3
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 O-O Rc1 Qa5 Nf3 Bg4/Gruenfeld/exchange variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 b5 a3 Be7/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 g3 Bg7 Bg2 O-O O-O Na6 e4 Re8/Benoni/fianchetto variation
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 cxd4 cxd4 O-O Nf3 Nc6/Gruenfeld/exchange variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Bc4 Nc6 Qd2 Nd7 O-O-O Nb6/Sicilian/dragon, Yugoslav attack, 9.Bc4
d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bg5 h6 Bxf6 Bxf6 e3 O-O Qd2 h4/QGD/4.Nf3
e4 e6 d4 d5 Nc3 Nf6 Bg5 dxe4 Nxe4 Be7 Bxf6 gxf6 Nf3 f5 Ng3c5 Bb5+ Nc6 c3 Qb6/French/Burn variation
e4 c5 Nf3 Nc6 Bb5 e6 O-O Nge7 b3 a6 Bxc6 Nxc6 Bb2 b6 c4 Bb7 Re1 Qc7 d4 cxd4/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bxf6 Qxf6 a3 Bxc3+ Qxc3 O-O e3 Bf5/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 O-O Rc1 c5 Nf3 cxd4 Nxd4 dxc4 Bxc4 Bd7/QGD/4.Bg5 Be7
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 Bxc4 e6 Qb3 Bxf3 gxf3 b5 Be2 Nd7 a4 b4 Nd2/QGA/Alekhine defence
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 f4 Qc7 g4/Sicilian/Scheveningen (Paulsen), classical variation
d4 Nf6 Bg5 g6 Bxf6 exf6 e3 Bg7 Bd3 f5/Trompovsky attack (Ruth, Opovcensky opening)/
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Bd3 Bb7 O-O e6 a4 b4 Nbd2 Nbd7/QGA/Alekhine defence
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Bc5 Qd3 O-O/Ruy Lopez/open, 8...Be6
e4 c5 c3 e6 d4 d5 exd5 exd5 Be3 c4 b3 cxb3 axb3 Nc6 Bd3 Bd6 Nf3 Nge7 O-O Bf5/Sicilian/Alapin's variation (2.c3)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f3 Qd2 h5 O-O-O Nbd7/Sicilian/Najdorf, Byrne (English) attack
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nf3 Nc6 c4 d4 e3 Bc5 exd4 Bxd4/Queen's pawn game/
Nf3 e6 c4 f5 g3 Nf6 Bg2 Be7 O-O O-O Nc3 c6 d4 d5 Qc2 Ne4 b3 Nd7 Bb2 Qe8/Dutch/stonewall with Nc3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O a4 Be7 Nb3 Na5/Sicilian/Taimanov variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Ne7 Bxc4 Nbc6 Be3 O-O Nb5 Ba5 O-O a6/QGA/3.e4
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 dxc4 Qxc4 b5 Qc2 Bb7 Nbd2/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 a6 c4 Nc6 Nc3 Nxd4 Qxd4 g6 Be3 Bg7 Qd2 O-O/Sicilian/Prins (Moscow) variation
d4 Nf6 Nf3 d5 c4 dxc4 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Nc6 a3 b5 Bd3 Bd6/QGA/classical variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 f4 e5 Nf3 Bc1 exf4 Bxf4 Be7/Sicilian/Taimanov variation
c4 c6 Nf3 d5 g3 Nf6 Bg2 Bf5 Qb3 Qb6 cxd5 Qxb3 axb3 cxd5 Nc3 Nc6 d3 e6/English/Caro-Kann defensive system
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 cxd4 cxd4 Nc6 Bb5 O-O/Gruenfeld/exchange variation
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Nd2 Bg7 Nc4 Bg5 Qe7 e3 b6/Benoni/Nimzovich (knight's tour) variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 a5 Nbd2 f5 Ne5 Be6/Neo-Gruenfeld, 6.O-O c6/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O Bd7 f3 h6 Be3 h5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Be7 Qe2 Qc7 O-O-O O-O/Sicilian/Sozin, 7.Be3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 a4 Be7 a5/Sicilian/Scheveningen (Paulsen), classical variation
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qc2 b6 Bf4 Nh5/Queen's pawn game/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 Qb3 a5 c5 Ne4 Na4 Nd7 O-O e5/King's Indian/fianchetto without c4
e4 e6 d4 d5 e5 b6 c3 Qd7 a4 a5 f4 h5 Nd2 Ne7 Ndf3 Ba6/French/advance variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Rc1 Re8 Ne5 Bxg2/Queen's Indian/Riumin variation
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 O-O Rc1 c5 dxc5 Bxc4/QGD/4.Bg5 Be7
d4 Nf6 Nf3 b6 Bf4 Bb7 e3 e6 Bd3 Nh5 Bg3 Be7/Queen's Indian defence/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 Re8 Na3/Ruy Lopez/closed, anti-Marshall 8.a4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 b3 O-O Bb2 Bf5 c4 Nbd7 Nc3 Ne4 e3 Nxc3/King's Indian/fianchetto without c4
e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 a3 Bd7 Bd3 Bc6 O-O Nd7 Re1 Qc7/Sicilian/Alapin's variation (2.c3)
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 b5 cxb5 a6 f3/King's Indian/Averbakh, 6...c5
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 dxc5 dxc5 Qxd8 Rxd8 e5 Nfd7 e6 Nf6 exf7+/King's Indian/Averbakh, 6...c5
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 a3 Be7 Rd1 a6/Nimzo-Indian/classical, Pirc variation
e4 e6 d4 d5 Nc3 Bb4 e5 c5 Bd2 Ne7 Nb5 Bxd2+ Qxd2 O-O c3 Nbc6 Nf3 a6 Na3 cxd4/French/Winawer, advance, Bogolyubov variation
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 Nc6 Bg5 Be6 Bxf6 exf6 c5 g6 Bb5 Bh6 Nge2 O-O/Caro-Kann/Panov-Botvinnik attack
Nf3 c5 g3 Nc6 Bg2 g6 d3 Bg7 O-O e5 e4 Nge7 c3 d6 Nbd2 O-O a4/Reti opening/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 Nbd7 Bb2 c6 Nbd2 Qc7/King's Indian/fianchetto without c4
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 g3 d5 Bg2 Bxd4 cxd4 dxe4 O-O O-O/Scotch game/
e4 e6 d4 d5 Nc3 Nf6 Bg5 Bb4 exd5 Qxd5 Bxf6 Bxc3+ bxc3 gxf6 Qd2 b6 Be2 Qd6 Bf3 Nc6/French/MacCutcheon variation
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 Bxc4 e6 h3 Bh5 Nc3 Nd7 e4/QGA/Alekhine defence
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Qd2 Be7 f3 O-O O-O-O d5 exd5 Nxd5/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Qe8 Bf3 h5 Nge2 Nh7/King's Indian/Averbakh system
c4 e5 Nc3 Nf6 g3 Bb4 Bg2 O-O Qc2 Re8 a3 Bxc3 Qxc3 d6/English/Bremen, Smyslov system
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc6 Rb8 Bg5 Bb7 Qc2 c5/Queen's gambit declined/
d4 e6 c4 f5 Nf3 Nf6 g3 Be7 Bg2 O-O O-O d5 b3 c6 Qc2 Bd7 Ne5 Be8 Bb2 Nbd7/Dutch/stonewall, Botwinnik variation
e4 e5 f4 exf4 Nf3 d5 exd5 Nf6 Bc4 Nxd5 O-O Be6 Qe2 Be7 Nc3c6 d4 O-O Nxd5 cxd5/KGA/Abbazia defence, modern variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 c5 a3 Bxc3+ Qxc3 Nbd7 Nf3 cxd4 Nxd4 O-O/Nimzo-Indian/classical, Noa variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Ne5 Nbd7 f4 c5/Nimzo-Indian/4.e3, main line with ...b6
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Bc4 Bg7 Nxc6 bxc6 e5Ng8 Qf3 e6 Bf4 Qa5/Sicilian defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e6 g4 h6 Bg2 Qc7 h4 h5 gxh5 Nxh5/Sicilian/Najdorf, Byrne (English) attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 a4 c5/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 e4 g6 f4 Bg7 Bb5+ Be2 a6 a4 O-O/Benoni/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 h3 c6 a4 Qc7 Be3 b6/King's Indian/fianchetto without c4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 a6 Nd6+ Bxd6 Qxd6 Qf6 Qa3 Qg6 Be3 Qxe4 Nc3 Qb4/Sicilian/Labourdonnais-Loewenthal variation
d4 Nf6 Nf3 e6 g3 b5 Qd3 Ba6 a3 c5 dxc5 Bxc5 b4 Be7 Nc3 e4 Bb7 Bb2 a5/Queen's pawn game/
d4 f5 c4 Nf6 g3 g6 Bg2 Bg7 Nf3 O-O O-O d6 Nc3 c6 d5 e5 dxc6 bxc6 b3 e4/Dutch/Leningrad, main variation with c6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Nbd7 Nf3 Nc5 O-O Be7 a4 O-O/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 f4 e5 Nde2 Be7 Qd2 a6/Sicilian/Taimanov variation
c4 Nf6 Nc3 e6 e4 c5 e5 Ng8 Nf3 Nc6 d4 cxd4 Nxd4 Nxe5 Ndb5 a6 Nd6+ Bxd6 Qxd6 f6 Be3 Ne7 Bb6 Nf5 Bxd8 Nxd6 Bc7 Ke7 c5 Ne8 Bb6 d5/English/Mikenas-Carls, Sicilian variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 Be2 Qb3 Nc6 e5 Be6/Gruenfeld/Russian, Alekhine (Hungarian) variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 Nbd7 Qe2 a6 a3 cxd4/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Qc2 O-O Nge2 Re8 O-O Nf8/QGD/exchange, positional line
e4 c5 Nf3 d6 Bb5+ Nc6 O-O Bd7 Re1 Nf6 c3 a6 Bf1 Bg4 d3 e6 Nbd2 Nd7 h3 Bh5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Qf6 b4 a6 a4/QGA/3.e4
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 e4 g6 f4 Bg7 Bb5+ Nf3 O-O O-O a6/Benoni/Taimanov variation
c4 f5 d4 Nf6 g3 g6 Bg2 Bg7 b3 c6 Nf3 O-O O-O d6 Bb2 Na6 Nc3 Rb8 d5 Bd7/Dutch/Leningrad variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Bxc3 bxc3 dxc4 Bxc4 Nbd7/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 Nf3 Qe8/King's Indian/Averbakh system
e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 bxc6 O-O Bg7 Re1 Qc7 c3 d6 h3 Rb8 d4 cxd4 cxd4 Nf6/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 Bd3 Nf6 O-O Bd6 f4 Bc5 Nf5 Bxe3+/Sicilian/Taimanov variation
Nf3 c5 b3 Nc6 Bb2 d6 g3 e5 Bg2 f5 O-O Be7 c4 Bf6 Nc3 Nge7/Reti opening/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nde2 Be6 f4 Nbd7 f5 Bc4 Nc1 d5/Sicilian/Najdorf, Byrne (English) attack
e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O d6 cxd4 Bb6 Nc3 Bg4 Qa4 Bd7/Evans gambit/Fraser attack
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qb3 b6 Nc3 Bb7 Rac1 Nbd7/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O Bxd2 Qxd2 cxd4 Qxd4 Nc6 Qd2 O-O/Queen's Indian/Capablanca variation
c4 c5 Nc3 Nc6 Nf3 g6 d4 cxd4 Nxd4 Bg7 Nc2 Bxc3+ bxc3 Qa5 Bd2 Nf6 f3 Ne5 e4 d6/English/symmetrical variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nxc6 bxc6 O-O e6 b3 Be7 Bb2 O-O/Sicilian/Sozin, Benko variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Ne5 c5 Ne2 c4/Nimzo-Indian/4.e3, main line with ...b6
c4 e5 Nc3 Nf6 g3 Bb4 Bg2 O-O e4 Bxc3 bxc3/English/Bremen, Smyslov system
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 O-O-O Nb6 Qc5 e5/Gruenfeld/Russian, Smyslov variation
e4 e5 Nf3 d6 d4 exd4 Nxd4 g6 Nc3 Bg7 g3 Nc6 Be3 Nf6 h3 Bg2 Ne5 O-O c6/Philidor/Larsen variation
d4 f5 Nf3 Nf6 g3 g6 Bg2 Bg7 O-O d6 c4 O-O Nc3 Qe8 d5 a5 Be3 Na6 Qd2 Bd7/Dutch/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 d5 exd5 exd5 O-O Bd6 Bf5/Sicilian/Taimanov variation
c4 e5 Nc3 Nc6 Nf3 Nf6 e3 Bb4 Qc2 O-O Nd5 Re8 Bd3 g6 a3 Nxf6+ Qxf6 Be4 d6 b4 Bg7 Bb2 Qe7/English/four knights, 4.e3
e4 g6 d4 Bg7 Nc3 c6 Bc4 d6 Qf3 e6 Nge2 b5 Bb3 a5 a3 Ba6 O-O Nd7 Bf4 Qe7/Robatsch defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 Qc7 O-O b5 Nxc6 Qxc6 a3 Bc5/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 Qf3 Be7 O-O-O Nbd7 Be2 Qc7 Rhe1 O-O/Sicilian/Najdorf, 6...e6
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 h3 Bg7 Bd3 O-O Bg5 h6 Be3 Na6/Benoni/6.e4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 dxc4 Qa4+ Nd7 e3 O-O Qxc4/Gruenfeld/5.Bg5
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Nb4 Be4 c6 Nbc3 Be6 Be3 N4d5/QGA/3.e4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qd1 e5/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 Qb6 Nb3 e6 Be2 a6 O-O Be7 Qd2 O-O/Sicilian/Richter-Rauzer
e4 c5 Nf3 d6 Bb5+ Nd7 c3 Nf6 Qe2 a6 Ba4 e6 O-O Be7 d4 b5 Bc2 cxd4 cxd4 Bb7/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 Nf6 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6 Nc3 Nb4/QGA/classical variation
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nf6 Nxf6+ gxf6 Bc4 Bf5 c3 e6 Qf3Nd7 Ne2 h5 Nf4 h4/Caro-Kann/Bronstein-Larsen variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 g6 Nb3 Bg7 O-O O-O Bg5 a6 f4 Be6/Sicilian/classical
d4 f5 g3 Nf6 Bg2 g6 c4 Bg7 Nc3 d6 d5 O-O Nh3 Nbd7 O-O Ne5 b3 c6 Bb2 Bd7/Dutch defence/
c4 e5 Nc3 Nf6 g3 g6 Bg2 Bg7 e4 d6 Nge2 O-O/English/Bremen system with ...g6
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 Nbd7 cxd5 exd5 Bb5 O-O O-O c6/Queen's Indian/Petrosian system
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 Be3 Nc6 Qb6 Qxb6 Bxb6 Nf6 Nc3Bg4 Be2 Rc8 O-O-O g6/Sicilian, Chekhover variation/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd3 a6 O-O-O Bd7 f4 Qc7 Be2 Be7/Sicilian/Richter-Rauzer, Keres variation
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 dxc4 Qc2 c5 dxc5 c3 bxc3 Bxc5 O-O Qc7/Queen's gambit declined/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 Nc6 Nge2 e5 d5 Ne7/King's Indian/Saemisch, 6...Nc6
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 Be7 a4 b4 cxb4 cxb4 Nbd2 O-O Nb3 d6/Queen's pawn game/
d4 Nf6 Nf3 b6 Bg5 Bb7 Nbd2 c5 e3 e6 Bd3 Be7 c3 O-O O-O Qe2 Nd5 Bxe7 Qxe7/Queen's Indian defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Bg5 Nc6 Nb3 a6 a4 Be6/Sicilian/dragon variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 O-O-O Na6/Gruenfeld/Russian, Smyslov variation
e4 c5 Nf3 d6 d4 cxd4 Qxd4 Bd7 c4 Nc6 Qd2 g6 b3 Bg7 Nc3 Bb2 Bg4 Be2 O-O/Sicilian, Chekhover variation/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 O-O Rb8 Nc3 b5 Ne5 Nxe5 dxe5 Nd7 Bf4 b4/Catalan/open, 5.Nf3
c4 Nf6 Nc3 e6 Nf3 Bb4 Qc2 O-O a3 Bxc3 Qxc3 b6 g3 Bb7 Bg2 d5 cxd5 Nxd5/English/Nimzo-English opening
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 Nc6 O-O Rb8 e3 Bd7 Qe2 b5 a4 a6 axb5 axb5/Catalan/open, 5.Nf3
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qb3 Bb7 Bg2 Nbd7 O-O a6 a4 c5/Queen's gambit declined/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3Ne4 Nxe4 Bxe4 O-O d6/Queen's Indian/Capablanca variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Bd5 Qb5+Bc6 Qd3 Be4 Qd1 c5/Queen's pawn game/
d4 f5 g3 Nf6 Bg2 g6 Nh3 d6 Nc3 Bg7 d5 c6 Nf4 e5 dxe6 d5 h4 Qe7 h5 g5/Dutch defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 d5 O-O/Sicilian/Taimanov variation
Nf3 c5 e4 d6 Bb5+ Nd7 Nc3 Nf6 d4 a6 Bxd7+ Nxd7 dxc5 Nxc5 Be3 e6 Bxc5 dxc5 Qxd8+ Kxd8/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Qe7 d4 Bb6 d5 Nd8 O-O d6 Bd3 Nf6 Nbd2 c6 Nc4 Bc7/Giuoco Piano/centre-holding variation
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 e4 g6 f4 Bg7 Bb5+ Bd3 Qh4+ Kf1 Qe7/Benoni/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 O-O Nf3 d5 O-O dxc4 Bxc4 Nbd7 Qe2 a6 a4 Qc7/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
e4 c5 Nf3 d6 Bb5+ Nd7 d4 a6 Bxd7+ Bxd7 O-O cxd4 Nxd4 Nf6 Nc3 e5 Nde2 Be7 Bg5 Be6/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qb3 dxc4 Qxc4 O-O Bxf6 Bxf6/Queen's Indian/Petrosian system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 h3 Re8 Re1 exd4 Nxd4 Nc5/King's Indian/fianchetto without c4
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Bg5 Bf5 e3 Nbd7 Bd3 Bxd3 Qxd3 Be7 O-O O-O/Queen's gambit declined/
e4 e5 Nf3 Nc6 d4 exd4 Bc4 Nf6 O-O Nxe4 Re1 d5 Nc3 dxc4 Rxe4+ Be6 Nxd4 Nxd4 Rxd4 Qc8/two knights defence/Canal variation
d4 d5 c4 e6 Nf3 c6 e3 f5 Nc3 Nf6 Be2 Bd6 Ne5 O-O O-O Nbd7 f4 Ne4 Nxe4 fxe4/Queen's gambit declined/
d4 e6 c4 f5 Nf3 Nf6 g3 d5 Bg2 c6 O-O Be7 b3 O-O Ba3 Bxa3 Nxa3 Qe7 Nc2 Bd7/Dutch/stonewall with Ba3
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 Bd6 Bg2 O-O O-O Nbd7 Rd1 Nbd2 Re8 b3 e5/Queen's gambit declined/
Nf3 c5 g3 Nc6 Bg2 g6 d4 cxd4 Nxd4 Bg7 Nxc6 bxc6 O-O Rb8 Nd2 Nf6 c4 O-O/Reti opening/
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 cxd4 Nxd4 Bc5 Nxc6/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 c5 Bd2 Bxc3 Bxc3 cxd4 Bxd4 Nc6 Bc3 Bd7/Nimzo-Indian/classical, Noa variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 Bd2 Bxc4 Nbd7 Qe2 c5/Nimzo-Indian/4.e3, main line with ...b6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O Nc6 Nb3 O-O f4 a5 a4 Be6/Sicilian/dragon variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 a6 Qd2 Nxd4 Qxd4Qa5 f4 e6 O-O-O Nd7/Sicilian/Richter-Rauzer
c4 e5 Nc3 d6 d4 exd4 Qxd4 Nc6 Qd2 g6 b3 Bg7 Bb2 Nf6/English opening/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e5 Nde2 Be6 Bb3 Be7 O-O O-O Kh1 Na5/Sicilian/Sozin, not Scheveningen
c4 c6 Nf3 d5 b3 Nf6 g3 Bf5 Bg2 e6 Bb2 Nbd7 O-O h6 d3 Be7 Nbd2 O-O a3 a5 Qc2 Bh7/English/London defensive system
b4 f5 Bb2 Nf6 e3 e6 b5 Be7 c4 O-O Nf3 d6 d4 Qe8 Be2 Nbd7/Polish (Sokolsky) opening/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O O-O Ne4 Nxe4 Bxe4 Ne1 d5 Qa4 Bxg2/Queen's Indian/old main line, 7.Nc3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd2 Qxb2 Nb3 Nc6 Bd3 Qa3/Sicilian/Najdorf, 7...Qb6
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 b4Nce4 Qb2/Nimzo-Indian/classical, 4...c5
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Bc5 Qe2 O-O/Ruy Lopez/open, 8...Be6
e4 c5 Nf3 Nc6 Bb5 e6 O-O Nge7 c3 d5 exd5 Qxd5 d4 cxd4 c4 Qh5 Nxd4 Qxd1 Rxd1 Bd7/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
e4 g6 d4 Bg7 Nc3 d6 Nf3 c6 a4 a5 Be2 Nf6 O-O O-O h3 Qc7 Be3 e5 Qd2 Nbd7/Robatsch defence/two knights, Suttles variation
e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 a6 Nbd2 d6 Nf1 O-O Ng3 h6 Bb3 Ba7 O-O Re8/Giuoco Piano/
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8 Qc2 a6/Benoni/classical, 9...Re8
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 f4 b5 Bd3/Sicilian/Taimanov variation
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 Bd2 b6 Bb5+ Bd7 Bd3 c5 a3 Bxc3 Bxc3 Nbc6 Nf3 Ng6/French/Winawer, advance variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Rd1 Nb6 Qb3 Nc6/Gruenfeld/Russian, Smyslov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be6 O-O Nbd7 Be3 Be7 f3 b5/Sicilian/Najdorf, Opovcensky variation
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Bd3 cxd4 exd4 Be7 Ne5 Nc6 Nxc6 bxc6/QGA/classical, 6...a6
e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Nd4 Ba4 c6 O-O b5 Bb3 Nxb3 axb3 d6 d4 Qc7 Bg5 Be7/Four knights/Rubinstein counter-gambit
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 Nbd7 Nf3 Qc7 Bd3 b5 O-O b4 Ne2 Bb7/Sicilian/Najdorf, 6.f4
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Bd7 Na3 cxd4 Naxc4 Bc5 Qb3 O-O/Catalan/open, 5.Nf3
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 Be3 Nf6 Nc3 Nbd7 O-O-O e5 Qa4Rb8 Qb3 Be7 Bc4 O-O/Sicilian, Chekhover variation/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 d6 Be3 Nf6 f4 Qd2 O-O O-O-O Nd7/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 f4/Sicilian/Scheveningen, Keres attack
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 Nf6 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6 Rd1 Qb6/QGA/classical variation
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e5 Nb5 d5 cxd5 Bc5 N5c3 O-O e3 e4 Nd2 Re8 Bb5 Re5/English/symmetrical, Benoni formation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nbd7 Bc4 a6 O-O g6 Bg5 Bg7 Re1 h6 Bh4 Ne5/Sicilian/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Nc6 a3 b5/QGA/classical variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 c5 Be2/QGD Slav/
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 e6 Bxc4 exd5 exd5 a6 Bf4 Bd6 Qe2+ Kf8 Bxd6+ Qxd6/QGA/3.e4
e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 e5 dxe5 dxe5 Qxd1+ Kxd1 Ng4 Ke1c6 h3 Nh6 g4 f6/Pirc/Austrian attack
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6 Be3 O-O O-O Qc7/Gruenfeld/exchange, classical variation
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 Nf3 c5 a3 Bxc3+ bxc3 Nbc6 a4 Qa5 Qd2 f6 exf6 gxf6/French/Winawer, advance, positional main line
e4 c5 Nf3 Nc6 Nc3 d6 d4 cxd4 Nxd4 Nf6 g3 g6 Nde2 b6 Bg2 Ba6 O-O Bg7 b3 O-O/Sicilian/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 h6 Be3 exd5 cxd5 a6/King's Indian/Saemisch, 5...O-O
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 Nbd2 Ne4 b3 c5 e3 cxd4 exd4 Nc6/Neo-Gruenfeld, 6.O-O c6/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 a4 e6 g3 b6 Bg2 Bb7 O-O Qc7 g4 h6/Sicilian/Najdorf
e4 c5 Nf3 Nc6 Nc3 e5 Bc4 d6 d3 h6 O-O g6 Ne1 Bg7 f4 Nf6 Nd5 Nxd5 Bxd5 exf4/Sicilian defence/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 a5 a4 Na6 Bb2 c6 Nbd2 d5 Re1 Bf5/King's Indian/fianchetto without c4
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 Nbd7 Bd3 Qc7 O-O Be7 Qe2 O-O e4 dxe4 Nxe4 c5/QGD Slav/
e4 c6 c4 d5 cxd5 cxd5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nge2 e6 g3 Bd7 Bf4 Qb6 Bg2 Bc6/Caro-Kann/anti-anti-Caro-Kann defence
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 exd4 Qxd4 Nf6 Nc3 Be6 Qxd8+ Kxd8 Nd4 Re8/QGA/3.e4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 Nc6 Qd2 O-O O-O-O Be6 Kb1 Qc8/Sicilian/dragon, Yugoslav attack, Rauser variation
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 e4 Ng4 e5 Nxf2/QGA/classical variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 h6 Bh4 g5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 dxc5 Bxc5 Qc2 Qc7 Nc3 b5/Queen's gambit declined/
e4 Nf6 e5 Nd5 d4 d6 Nf3 c6 c4 Nc7 Nc3 dxe5 Nxe5 Nd7 Nf3 Bf4 Bg7 Be2 O-O/Alekhine's defence/modern variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 f4 Be7 Be3 O-O O-O g4 Re8/Sicilian/Scheveningen (Paulsen), classical variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc6 Rb8 O-O Bb7 Qc2 c5/Queen's gambit declined/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 Nc6 Bb2 e5 dxe5 Nbd2 Ndxe5 Nxe5 Nxe5/King's Indian/fianchetto without c4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O b5 Bb3 Bb7 d3 Bd6 a4 O-O Nc3 b4 Ne2 h6/Ruy Lopez/Archangelsk (counterthrust) variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O Nc6 Nxd4 Qb6 Nb3 d5 Nc3 Be7 e4 dxe4 Nxe4 Nxe4/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 b4 c3 d6 h3 Rb8/Ruy Lopez/closed, anti-Marshall 8.a4
f4 d5 Nf3 Nf6 e3 Bg4 h3 Bxf3 Qxf3 Nbd7 Nc3 c6 d4 e6 a3 Bd3 c5/Bird's opening/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 a3 Bxc3+ bxc3 Bb7 O-O dxc4 Bxc4 Nc6/Nimzo-Indian/4.e3, main line with ...b6
e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O e5 Nfd7 h4 c5 h5 cxd4 Qxd4 dxe5 Qf2 e4/Pirc/Austrian attack, 6.e5
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Nb3 Bb6 a4 a6 Nc3 Nf6 Bg5 h6 Bh4 d6 Bd3 Be6/Scotch/Potter variation
c4 e5 Nc3 Nc6 Nf3 f5 d4 e4 Nd2 Nf6 e3 Bb4/English/three knights system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nge7 Nb3 d6 a4 b6 Bg2 Bb7 O-O Nc8/Sicilian/Taimanov variation
c4 Nf6 Nf3 g6 b4 Bg7 Bb2 O-O e3 c6 Be2 d5 O-O Bg4 Qb3 h3 Bxf3 Bxf3 e6/English opening/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 dxc4 e3 b5 a4 c6 Nd2 a6/Gruenfeld/5.Bg5
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Bd7 Bg5 e6 f3 a6 Qd2 O-O-O b5 h4 h6/Sicilian/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 c4 e5 Nf3 d4 O-O Nc6 e3 d3 Nc3 Bb4/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Be3 Be7 Qf3 Bd7 O-O-O Nxd4 Bxd4 Bc6/Sicilian/Scheveningen, Tal variation
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Nb4 Be4 f5 exf6 exf6 Nc3 f5/QGA/3.e4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Na5 f4 Bd7/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Bc4 a6 Bb3 Qc7 f4 Be7 Qf3 O-O/Sicilian/Sozin, 7.Be3
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 O-O e3 h6 Bh4 b6 Bd3 dxc4 Bxc4 Bb7 O-O Nbd7/QGD/Tartakower (Makagonov-Bondarevsky) system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Qd2 Be7 f3 Bb5 Bd7 exd5 exd5/Sicilian/Taimanov variation
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 e5 O-O Nge7 d3 O-O/English/symmetrical, Botvinnik system reversed
e4 c6 d4 d5 e5 Bf5 c3 e6 Be3 Nd7 Nd2 Qb6 Qb3 c5 Qxb6 axb6 Bb5 c4 Ne2 Ne7/Caro-Kann/advance variation
Nc3 d5 e4 dxe4 Nxe4 Nf6 Nxf6+ gxf6 d4 c6 Be2 Bf5 Nf3 Qc7 O-O Nd7 c4 O-O-O Be3 e6/Caro-Kann/Bronstein-Larsen variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O Bxb4 cxb4 Nbd2 d6 Ne1/Queen's Indian/Capablanca variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 a6 a4 e6 Qd2exd5 cxd5 Nbd7/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f3 Qb6 g4 Nc6 Nb3 e6 Qe2 d5 Be3 d4/Sicilian/Najdorf
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 c5 d5 e6 Qd2 exd5 exd5 Kh7/King's Indian/Averbakh system
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Nc6 a3 Bd6/QGA/classical variation
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Nc6 Rc1 Bg4/Gruenfeld/exchange variation
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Nd2 Nbd7 Nc4 Nb6 e4 Nxc4 Bxc4 Bg7/Benoni/Nimzovich (knight's tour) variation
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Bd3 Nbd7 Qe2 Rd1 Bb7 dxc5/QGA/classical, 6...a6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Rh3/Sicilian/Scheveningen, Keres attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 a6 O-O Qc7 a4 Be7 f4 O-O/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Na3 O-O O-O Nc6 Nxc4 Be6 b3 a5 a4/Neo-Gruenfeld, 5.Nf3/
d4 Nf6 Nf3 d5 c4 e6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 a4 Bd7 Rd1 Nc6 Qxc4 Nb4/Catalan/closed, 5.Nf3
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 Nf6 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6 Nc3 Bb7/QGA/classical variation
c4 e5 Nc3 f5 e3 Nf6 d4 e4 Nh3 g6 Be2 Bg7 b4 Nc6 Qb3 Ne7 c5 d5 cxd6 cxd6/English opening/
Nf3 d5 c4 dxc4 Qa4+ Nd7 g3 a6 Qxc4 b5 Qc2 Bb7 Bg2 c5 O-O Rc8 a4 Ngf6 d3 e6/Reti accepted/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 f4 Be7 Be3 a4/Sicilian/Scheveningen (Paulsen), classical variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O Nc6 Nxd4 Qb6 Nb3 d5 Be3 Qc7 N1d2/Queen's pawn game/
d4 c5 d5 e5 e4 d6 Nc3 a6 a4 Ne7 Nf3 Ng6 h4 h5 g3 Be7/Semi-Benoni ('blockade variation')/
e4 e5 d4 exd4 Qxd4 Nc6 Qe3 Be7 Nc3 Nf6 Bd2 d5 exd5 Nxd5 Qg3 Nxc3 Bxc3 Bf6 Bb5 O-O/Centre game/Paulsen attack
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qb3 dxc4 Qxc4 O-O Rd1 Nd5/Queen's Indian/Petrosian system
e4 c5 Nf3 d6 Bb5+ Nd7 d4 Nf6 Nc3 a6 Bxd7+ Nxd7 O-O e6 Bg5 Qc7 d5 e5 a4 g6/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 c5 dxc5 Nbd7 c6 bxc6 Bxc4 Nb6/Gruenfeld/5.Bf4
c4 Nf6 Nc3 e6 Nf3 b6 e4 Bb7 Bd3/English/Queens Indian, Romanishin variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 Be7/Queen's pawn game/
d4 Nf6 Nf3 e6 Bg5 c5 c3 h6 Bh4 cxd4 cxd4 Qb6 Qc2 Nc6 e3 Nc3 Bd7 Be2 Ne4/Queen's pawn/Torre attack
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 Be2 Qb3 c5 dxc5 Bb7/Gruenfeld/Russian, Alekhine (Hungarian) variation
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Nbd2 dxc4 Bg2 Nc6 O-O Bxd2 Bxd2 Nxd4 Nxd4/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 a3 Nc6 Nb3 Qc7 g4 b5/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd3 O-O-O Bd7 Be2 Rc8/Sicilian/Najdorf, 7...Qb6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be7 Qd2 O-O f3 Nbd7 g4 b5/Sicilian/Najdorf, Byrne (English) attack
e4 c5 Nf3 d6 d4 cxd4 Qxd4 Nc6 Bb5 Bd7 Bxc6 Bxc6 c4 Nf6 Nc3e6 O-O Be7 Rd1 O-O/Sicilian, Chekhover variation/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O Bxd2 Qxd2 cxd4 Qxd4 Nc6 Qf4 Qb8/Queen's Indian/Capablanca variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 exd4 Be7 Nc3 O-O/QGA/classical, 6...a6
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 c5 c3 cxd4 cxd4 Qa5+ Nbd2 Ne4 O-O Nxg5 Nxg5 Bxg2/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Ne5 Nbd7 f4 Bxc3/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 cxd5 Ne5 Nbd7 Nc3 e6 Bf4 Nh5/Neo-Gruenfeld, 6.O-O, main line/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Qc7 Nb5 Qb8 c4 Nf6 N5c3 e6 Be2 Bc5 O-O h5 g3 h4/Sicilian/Flohr variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Nd5 Bxb4 Nxb4 O-O a6 Ne5 O-O/Catalan/open, 5.Nf3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Be2 e5 Nf3 h6 O-O Be7 Re1 O-O h3 Re8/Sicilian/Boleslavsky variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Re1 Nc6 Nb3 Be6 Bf1 d5/Sicilian/dragon variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d6 h3 Na5 Bc2 c5/Ruy Lopez/closed (10...c5)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 a4 g6 Be2 Bg7 O-O f4 Nc6 Be3 Rb8/Sicilian/Najdorf
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e5 Nf3 Nbd7 Bd3 Be7 O-O b5 Qe1 Bb7/Sicilian/Najdorf, 6.f4
c4 e5 Nc3 Nc6 Nf3 f5 d4 e4 d5 exf3 dxc6 fxg2 cxd7+ Qxd7 Qxd7+ Bxd7 Bxg2 O-O-O/English/three knights system
c4 Nf6 Nc3 e6 Nf3 Bb4 Qb3 Nc6 a3 Be7 e4 e5 d3 O-O/English/Nimzo-English opening
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Qd2 Be7 f3 O-O O-O-O d5 Qe1 Bd7/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Qa4+ Nfd7 Nbd2 a6 Qxc4Nb6 Qc2 Nc6 Nb3 O-O/Neo-Gruenfeld, 5.Nf3/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 c6 e3 Bg4 Qb3 Qb6 cxd5 Qxb3 axb3 Bxf3/Gruenfeld/5.Bf4
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qb3 b6 cxd5 cxd5 Rc1 Bb7/Queen's pawn game/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd2 Qxb2 Nb3 Qa3 Bd3 Nbd7/Sicilian/Najdorf, 7...Qb6
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 b6 Nc3 Bb7 f3 d6 e4 e6 Be3 Be7 Be2 O-O/English/symmetrical, Benoni formation
Nf3 d5 b3 c5 e3 Nc6 Bb2 Nf6 Bb5/Reti/Nimzovich-Larsen attack
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 Be7 O-O-Oa6 f4 Qc7 Nf3 h6/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
e4 g6 d4 Bg7 Nc3 d6 Be3 c6 Qd2 b5 f3 Nd7 a4 b4 Nd1 Qa5 Bd3 Ngf6 Ne2 O-O/Robatsch (modern) defence/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 Qd2 e6 Rd1 b6 d5/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Qc7 Qe2 Na5 g4 b5/Sicilian/Sozin, 7.Be3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Be2 e5 Nb3 Be7 O-O O-O Kh1 a5 a4 Be6/Sicilian/Boleslavsky variation, 7.Nb3
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O Bg5 h6 Bh4 g5/Benoni/classical without 9.O-O
e4 d5 exd5 Nf6 d4 Nxd5 Nf3 g6 Be2 Bg7 O-O O-O Re1 c5 dxc5 Na6 Bxa6 bxa6 c3 Bb7/Scandinavian/Marshall variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Qa5 Bxf6 gxf6 Nb3 Qg5 Nd5 Rb8 f4 Qg6/Sicilian/Richter-Rauzer
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 a3 a6 Rb1 Rb8 b4 cxb4 axb4 b5 cxb5 axb5/English/ultra-symmetrical variation
f4 c5 g3 g6 Bg2 Bg7 Nf3 Nc6 O-O d6 c3 f5 d3 Nf6 Na3 O-O e4 Kh8 exf5 gxf5 Nc4 Be6/Bird's opening/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 Be3 c6 O-O exd4 Nxd4 Re8 Qc2 Qe7/King's Indian/Gligoric-Taimanov system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 Bd7 Be2 Qa5 Bxf6gxf6 O-O Qg5 Kh1 Rg8/Sicilian/Richter-Rauzer, Larsen variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O d5 Bb4 Bd2 Bxc3 exd5 Nh4 Ne4/Queen's Indian/anti-Queen's Indian system
c4 c5 Nf3 Nf6 g3 b6 Bg2 Bb7 O-O g6 b3 Bg7 Bb2 O-O Nc3 d6 e3 Nbd7 d4 e6 Qe2 a6/English/symmetrical variation
e4 e5 Nc3 Nc6 Nf3 g6 d4 exd4 Nd5 Bg7 Bg5 Nce7 Nxd4 c6 Nc3 h6 Be3 d5 exd5 Nxd5/Three knights/Steinitz, Rosenthal variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 c5 dxc5 Qa5 Nd2 dxc4 e4 O-O Bxc4 Qxc5 O-O Nc6/Gruenfeld/5.Bf4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 d4 b5 Bb3 Nxd4 Nxd4 exd4 c3 dxc3 Qh5 Qd7 Nxc3 Nf6/Ruy Lopez/modern Steinitz defence
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 e5 Ne8 f4 f6/Sicilian/dragon, Yugoslav attack, 7...O-O
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e3 c5 Bxc4 cxd4 Nxd4 Nbd7 Bg3 Nb6/Gruenfeld/5.Bf4
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 O-O b5 Qb3 Bb7 a4 Bd5/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8 Nc3 Bd7 b3 h6/Ruy Lopez/Berlin defence, open variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nge7 Nb3 d6/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Bg5 Nc6 Nb3 Be6 Kh1 Rc8/Sicilian/dragon variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 c5 Bd2 Bxc3 Bxc3 cxd4 Bxd4 Nc6 Bc3 O-O/Nimzo-Indian/classical, Noa variation
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Rb1 a6 Rc1 cxd4/Gruenfeld/exchange variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Bd7 O-O g6 Bg5 Bg7 Nxc6 bxc6 Qd2 O-O/Sicilian/Sozin, not Scheveningen
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 O-O Bd7 c3 Nf6 Re1 g6 d4 Qe7 Nbd2 Bg7 dxe5 Nxe5/Ruy Lopez/modern Steinitz defence, 5.O-O
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 Nc3 dxc4 Bxc4 b5 Bd3 e4 c5 d5 c4/QGD semi-Slav/Meran, Reynolds' variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qc2 dxc4 e3 b5 Ne5 a6/Queen's Indian/Petrosian system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 Bf4 Ng6 Bg3 Be7 O-O O-O Qd2 d6/Sicilian/Taimanov variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 d5/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O Qd6 Na3 Be6 Qe2 f6 Nc4 Qd7 Rd1 c5 c3 Bg4/Ruy Lopez/exchange, Bronstein variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 a4 Nc6 O-O Be3 Be7 Nb3 Na5/Sicilian/Scheveningen (Paulsen), classical variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Na3 b4/Queen's pawn game/
f4 e5 fxe5 d6 exd6 Bxd6 Nf3 Nf6 d4 Ng4/Bird/From gambit
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qb3 b6 Nc3 Ba6 cxd5 cxd5/Queen's pawn game/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 e3 Qd6 Be2 O-O/Gruenfeld/5.Bg5
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 Bg4 Bxc4 Bxf3 gxf3/Gruenfeld/5.Bf4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nb3 Be7 O-O O-O Be3 a5 f3 Be6/Sicilian/Boleslavsky variation, 7.Nb3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O Nbd7 a4 b6 Be3 O-O/Sicilian/Najdorf, Opovcensky variation
e4 c6 d4 d5 Nd2 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nf6 Ne5 Bh7 Bd3 Nbd7 Bxh7 Nxh7/Caro-Kann/classical, 6.h4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 Nc6 c4 Qb6 Nc2 g6 Nc3 Rb1 Nb4 Ne3 O-O/Sicilian/Prins (Moscow) variation
c4 Nf6 d4 e5 dxe5 Ne4 Nf3 Nc6 Nbd2 Nc5 a3 Qe7 e3 Nxe5 Nxe5Qxe5 Nf3 Qf6 Be2 Be7/Budapest/Fajarowicz variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be6 O-O Nbd7 Be3 b5 f4 Be7/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Ng4 f4 Nxe5 fxe5 Nc6/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 Nc3 c6 a4 Qc7 b3 exd4/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 Nc6 Qd2 a6 Bd3/King's Indian/Saemisch, 6...Nc6
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 Rb8 Qxc4 b5 Qd3 Bb7 Bf4 Rc8/Queen's gambit declined/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 Nc3 c6 a4 Qc7 b3 Re8/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Be7 b4 c5 bxc5 dxc4/Nimzo-Indian/4.e3, main line with ...b6
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 b6 O-O Bb7 a3 b4 Nbd7 Rb1 c6/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e5 Nde2 Nbd7 Bg2 Be7 O-O b5 Nd5 Nxd5/Sicilian/Najdorf, Zagreb (fianchetto) variation
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O Qd6 Na3 Be6 Qe2 f6 Rd1 Bg4 h3 Bxf3 Qxf3 Qe6/Ruy Lopez/exchange, Bronstein variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e6 Bg2 Qc7 O-O a4 Nc6 Nb3 b6/Sicilian/Najdorf, Zagreb (fianchetto) variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e6 f3 b5 a4 b4 Na2 e5 Nb3 d5/Sicilian/Najdorf, Byrne (English) attack
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5/English/symmetrical variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 Bd3 Nf6 O-O Ne5 h3 d6/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bc4 e6 Bb3 Nc6 Be3 Be7 f4 O-O Qf3 Na5/Sicilian/Najdorf, Lipnitzky attack
d4 f5 c4 Nf6 g3 e6 Bg2 d5 Nf3 c6 O-O Bd6 Ne5 O-O Bf4 Ng4 Nxg4 Bxf4 gxf4 fxg4/Dutch defence/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Bd7 Qd2 Rc8 O-O-O Nxd4 Qxd4 Qa5 Bxf6 gxf6/Sicilian/Richter-Rauzer, Larsen variation, 7.Qd2
e4 Nf6 e5 Nd5 d4 d6 Nf3 g6 Bc4 Nb6 Bb3 Bg7 a4 d5 a5 Nc4 Nbd2 b5 axb6 Nxb6/Alekhine's defence/modern, Keres variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 Nc6 a3 Ba5 Na4 cxd4/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 c5 d5 d6 e4 Nf6 Nc3 g6 Nf3 Bg7/Old Benoni defence/
e4 c5 c3 e6 Nf3 d5 exd5 exd5 d4 Nc6 Bb5 Bd6 O-O Nf6 dxc5 Bxc5 Bg5 Be6 Nbd2 h6/Sicilian/Alapin's variation (2.c3)
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Re8 d6 Bf8/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 a3 Bd6 b4 Ne4/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 h6 Bf4 Ne8/King's Indian/Averbakh, 6...c5
c4 e5 Nc3 Nc6 Nf3 g6 d4 exd4 Nxd4 Bg7 Nxc6 bxc6 g3 Qe7 Bd2Qe6 b3 Ne7/English/three knights system
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nc3 Bd6 Qe2 b5 e4 Be7/Catalan/open, 5.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Be7 b3 O-O Bb2 d6/Sicilian/Taimanov variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 Bd6 Bg2 O-O O-O Nbd7 Rd1 Nbd2 Re8 e4/Queen's gambit declined/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Bb7/QGA/classical variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Be3 Nc6 h3 Bd7 f4 Rc8/Sicilian/dragon variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 cxd5 cxd5 Ne5 b6*/King's Indian/fianchetto without c4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Bd7 Be2 Qa5 Bxf6gxf6 Nb3 Qg5 g3 h5/Sicilian/Richter-Rauzer, Larsen variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 c5 cxd5 Nxc3 bxc3 Qxd5 e3 Nc6 Be2 O-O/Gruenfeld/5.Bg5
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 c6 e3 Bg4 h3 Bxf3 Qxf3 Qa5 Bd3 Nbd7/Gruenfeld/5.Bf4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Be7 Qf3 Nxc6 bxc6 b3 e5/Sicilian/Scheveningen, 6.f4
d4 Nf6 Nf3 e6 g3 b5 Qd3 Ba6 a3 c5 dxc5 Bxc5 b4 Bb6 Bg2 d5 O-O O-O Bb2 Nc6/Queen's pawn game/
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 e4 Nf6 Nge2 O-O O-O d6/English/symmetrical, Botvinnik system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 Qd2 b6 d5 Ne5 Ng3/King's Indian/Saemisch, 5...O-O
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 c4 O-O O-O d6 Nc3 c6 b3 Nh5 Bb2 Na6 d5 e5/Dutch/Leningrad, main variation with c6
d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bg5 h6 Bxf6 Bxf6 e3 O-O Qd2 dxc4 Bxc4 c5 dxc5 Nd7/QGD/4.Nf3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 a6 O-O Be7 Be3 O-O f4 Nxd4/Sicilian/Sozin, Leonhardt variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 h4 c5 d5 Nc7 h5/King's Indian/Averbakh system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 Nf6 Be3 Be7 O-O O-O f4 Bd7 Nb3 a6/Sicilian/modern Scheveningen, main line with Nb3
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 Na6 Bg5 h6 Bxf6 Nbd2 Rb8 e4 Qd8/Queen's pawn game/
e4 c5 Nf3 d6 d4 Nf6 Nc3 cxd4 Nxd4 a6 Be3 Ng4 Bc1 Nf6 Be3 Ng4 Bg5 h6 Bh4 g5/Sicilian/Najdorf, Byrne (English) attack
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nf6 Ne5 Bh7 Bd3 Nbd7 Bxh7 Nxe5/Caro-Kann/classical, 6.h4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 Qb3 dxc5 Nbd7 Qa3 Qc7/Gruenfeld/Russian, Alekhine (Hungarian) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Bg4 e3 e5 Qb3 Bxf3 gxf3 Nb6/Gruenfeld/Three knights variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 Be7 O-O-ONxd4 Qxd4 a6 e5 dxe5/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nc6/QGA/classical variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 c5 d5 Qa5 a4 e6 Ra3 exd5/King's Indian/Saemisch, 5...O-O
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 e5 b4 exf6 bxc3 bxc3 Qa4/QGA/Linares variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 a3 Nc6 Nxc6 bxc6 g4 g6/Sicilian/Scheveningen, 6.f4
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Bd3 Bb7 a4 b4 Nbd2 e6 Qe2 c5 dxc5 Bxc5/QGA/Alekhine defence
d4 f5 g3 Nf6 Bg2 d6 Nf3 g6 O-O Bg7 b4 O-O Bb2 c6 c4 Na6 Qb3 Nc7 Nc3 Kh8/Dutch defence/
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 e4 Bg7 Bg5 h6 Bh4 O-O Nd2 b6/Benoni/classical, 8.Bg5
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Nbd2 Nd7/Ruy Lopez/closed, anti-Marshall 8.a4
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 a3 Bd7 b4 cxd4 cxd4 Rc8/French/advance, Paulsen attack
e4 c5 c3 Nf6 e5 Nd5 g3 d6 exd6 e6 Bg2 Bxd6 Nf3 Nc6 d4 O-O O-O cxd4 Nxd4 Bd7/Sicilian/Alapin's variation (2.c3)
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 c5 c3 Bf5 Nbd2 e4 Bh3 e5 Bxg2/King's Indian/fianchetto without c4
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Nxe5/Catalan/open, 5.Nf3
d4 f5 g3 Nf6 Bg2 e6 c4 d5 Nh3 c6 O-O Bd6 Qc2 O-O Nd2 Bd7 Nf3 Be8 Bf4 h6/Dutch defence/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 h4 e5 d5 h6 Be3 Nc5 Qc2 c6/King's Indian/Averbakh system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O Bxb4 cxb4 Qd3 d6 Nbd2 Re8/Queen's Indian/Capablanca variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 a4 a5 b3 c6 e4 e5 Ba3 exd4/King's Indian/fianchetto without c4
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 Rd1 e5/QGD semi-Slav/Stoltz variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 Be7 Be2 a6 O-O-O Qc7 f4 Bd7/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
c4 c5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nxc3 bxc3 g6 h4 Bg7 h5 Qc7/English/symmetrical variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qc7 Bxf6 gxf6 Qd2 b5 Be2 h5/Sicilian/Najdorf, 7.f4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O Be3 a6 a4 Qc7 a5 Nbd7/Sicilian/Scheveningen, 6.Be2
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O b3 d6 Bb2 Qe8 Nbd2 h6 Re1 g5 e4 fxe4/Dutch defence/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nb3 Be6 Nc3 Be7 f4 exf4 gxf4 g6/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Be7 c3 O-O/Ruy Lopez/open, 8...Be6
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Nf3 Nf8 O-O Bg4 h3 Bh5/QGD/exchange, positional line
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 a3 Nc6 Be2 Be7/Nimzo-Indian/classical, Pirc variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O h6 Bf4 Bd7 Nf3 e5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Qa5 Nf3 Na6 Bd2 Nxc5 a3 b6 Nd4 Bxc3/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 Nbd7 cxd5 exd5 Be2 c5/Queen's Indian/Petrosian system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Rc1 Re8 Qa4/Queen's Indian/Riumin variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Nxc6 bxc6 Bd3 d5 O-O Nf6 Re1 Be7 e5 Nd7/Sicilian/Taimanov variation
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 Bf4 a6/QGA/Linares variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Bc5 Nd4 d6/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 cxd5 Ne5 Nc6 Nc3 e6 Bg5 h6/Neo-Gruenfeld, 6.O-O, main line/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 a6 f4 Nxd4/Sicilian/Sozin, Leonhardt variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bh4 c5 dxc5 g5 Bg3 Nc6 e3 Qa5/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 a4 c6 b3/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 f4 Nc6 Bb5 Bd7 Bxc6 bxc6 e5 Nd5 Nxd5 cxd5/Sicilian/dragon, Levenfish variation
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4 Bd3 dxc4 Bxc4 O-O O-O a6 a3 Be7/Caro-Kann/Panov-Botvinnik attack, 5...e6
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Nb6 Bg5 h6 Bh4 g5 Bg3 c5/Gruenfeld/Three knights variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Ne5 Nbd7/Queen's Indian/Riumin variation
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Be7 Bf4 O-O Bd3 dxc4 Bxc4 Nbd7 O-O Nb6/Caro-Kann/Panov-Botvinnik attack, 5...e6
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O b3 d6 Bb2 e5 dxe5 Nfd7 Nc3 dxe5 e4 c6/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Nb6 Bg5 Nc6/Gruenfeld/Three knights variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 Nb3/Sicilian/Taimanov variation
e4 c6 d4 d5 Nd2 dxe4 Nxe4 Nf6 Nxf6+ exf6 c3 Bd6 Bd3 O-O Qc2 Re8+ Ne2 Kh8 Be3 Nd7/Caro-Kann/Tartakower (Nimzovich) variation
e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3 Nc6 Qd2 d5 Ne7 Rad1 Bd7/Pirc/classical system, 5.Be2
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Rb1 b6 Bc4/Gruenfeld/exchange variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 cxd4 exd4 a6 Bg5 b5/Nimzo-Indian/4.e3, Gligoric system with 7...dc
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 Nf6 O-O Be7 Be3 O-O f4 a6 Kh1 Qc7/Sicilian/modern Scheveningen, main line
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Nb6 e3 Nc6 Bb5 Bd7 O-O e5/Gruenfeld/Three knights variation
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Rb1 cxd4 cxd4 Qxd2+/Gruenfeld/exchange variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 Nf4 Be3 e5 dxe5 dxe5/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Nd5 Bxb4 Nxb4 O-O Rb8 Nc3 a6/Catalan/open, 5.Nf3
e4 c6 d4 d5 Nd2 dxe4 Nxe4 Nd7 Ng5 Ngf6 Bd3 e6 N1f3 Bd6 Qe2h6 Ne4 Nxe4 Qxe4 Qc7/Caro-Kann/Steinitz variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d6 O-O Bf5 Ne1 Qd7 e4 Bh3 f3 Bxg2/King's Indian/fianchetto, Larsen system
c4 c5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nc7 Nf3 Nc6 O-O e5 d3 Be7 Nd2 Bd7/English/symmetrical, Rubinstein system
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Bd7 Na3 Nxd7 Qxd7 dxc5 Bxc5/Catalan/open, 5.Nf3
Nf3 d5 c4 d4 e3 Nc6 exd4 Nxd4 Nxd4 Qxd4 Nc3 e5 d3 Ne7/Reti/advance variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 h6 Bf4 e5 Be3/King's Indian/Averbakh, 6...c5
e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 d3 d6 O-O O-O Nbd2 Bd7 Ba4 h3 Ba7 Re1 Ne7/Ruy Lopez/classical defence, 4.c3
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Qc2 g6 Bg5 Be7 e4 dxe4 Bxf6 Bxf6 Qxe4+ Qe7/Queen's gambit declined/
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 Nf6 Bd3 Be7 h3 O-O O-O Nc6 c3 Re8 Re1 Bd7/Petrov/classical attack, close variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 Nbd7 cxd5 exd5 Be2 O-O O-O c5/Queen's Indian/Petrosian system
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4 Nxd4 Nxd4 Qxd4 d6 Qd3 a6 Bd2 Rb8 e4 Be6/English/symmetrical, main line with d4
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qc2 dxc4 e3 b5 a4 Bxf3/Queen's Indian/Petrosian system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 Nbd7 Bc4 g6 Qd2 Bg7 f3 h6 Be3 b5/Sicilian/Najdorf, 6.Bg5
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 c4 Nc6 Nc3 Nf6 d4 cxd4 Nxd4 e6 O-O Be7 b3 O-O/Sicilian/Canal-Sokolsky attack, Sokolsky variation
d4 Nf6 Nf3 d5 c4 e6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 a4 Bd7 Rd1 Bc6 Nc3 Bb4/Catalan/closed, 5.Nf3
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Bd3 Bb7 O-O e6 Qe2/QGA/Alekhine defence
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f4 Qd2 exf4 Bxf4 Nbd7/Sicilian/Najdorf, Byrne (English) attack
d4 f5 g3 Nf6 Bg2 g6 c4 Bg7 Nc3 c6 d5 d6 Nh3 e5 dxe6 Bxe6 b3 O-O O-O Na6/Dutch defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 Bd7 Qd2 Rc8 Nb3 a6 Be2 e6 O-O h6/Sicilian/Richter-Rauzer, Larsen variation, 7.Qd2
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e6 g4 h5 gxh5 b5 a3 Bb7 Bg2 Nbd7/Sicilian/Najdorf, Byrne (English) attack
e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3 Nf6 Re1 O-O d4 cxd4 cxd4 d5 e5 Ne4 Nc3 Bf5/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Nb3 Nbd7 Bd3 Qe3+ Qe2 Qxe2+/Sicilian/Najdorf, 7...Qb6
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 Be7 Bg5 Na6 Qd3 Qb6 Nbd2 d5 a3 h6/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O Be3 e5/Sicilian/Scheveningen, 6.Be2
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 cxd4 exd4 a6 Bg5 Nbd7/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 c5 c3 Ne4 Nbd2 Nxd2 Bxd2 cxd4 cxd4 Nc6/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O Nc6 Be3 O-O f4 a6 Qe1 Nxd4/Sicilian/modern Scheveningen, main line
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e5 Nde2 Be7 Bg2 O-O O-O Be6 h3 Nbd7/Sicilian/Najdorf, Zagreb (fianchetto) variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 a6 f4 Qc7 Qe2 O-O/Sicilian/Sozin, Leonhardt variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Bf4 e5 Nxe5 c5/Queen's Indian/Riumin variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Bd6 cxd5 exd5 b4 Nbd7/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 d5 a3 Bxc3+ Nxc3 cxd4 exd4 dxc4 Bxc4 Nc6 Be3 O-O/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 a3 Be7 h3 Nc6/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Nge2 c6 Qd2 b5 h4/King's Indian/Saemisch, 5...O-O
d4 f5 Nf3 Nf6 g3 e6 Bg2 Be7 O-O O-O b3 d6 Bb2 Qe8 Nbd2 c4 Qh5 e3 g5/Dutch/
c4 e5 Nc3 Nc6 Nf3 f5 d4 e4 Ng5 Nf6 e3 Bb4 Bd2 Qe7/English/three knights system
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 f4 Bg7 Bb5+ a4 O-O Nf3 Re8/Benoni/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 g3 h6 Be3 Bg2 Bd7 O-O O-O/Sicilian/Richter-Rauzer, 6...e6
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 Nf3 h6 Bxf6 Bxf6 e3 O-O Qb3 dxc5 Nd7 cxd5 Qa5/QGD/4.Bg5 Be7
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Qxd4 Qxd4 Nxd4 Nf6 f3 Bd7 Bxc4 Nc6 Nxc6 Bxc6/QGA/3.e4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Bc5 Qe2 Qe7/Ruy Lopez/open, 8...Be6
e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O e5 Nfd7 Bc4 Nb6 Be2 dxe5 fxe5 Nc6 O-O Bg4/Pirc/Austrian attack, 6.e5
d4 d5 c4 e6 Nc3 c6 Nf3 dxc4 a4 Bb4 e4 b5 Be2 Bb7 O-O a6 e5/QGD/semi-Slav, Noteboom variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6 Na3 b5 Nab1 Be7 Bxf6 Bxf6/Sicilian/Pelikan, Chelyabinsk variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 cxd5 Ne5 Ng4 Nxg4 Bxg4 Nc3 Nc6/Neo-Gruenfeld, 6.O-O, main line/
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc5 Nc6 cxd5 exd5/QGD/Charousek (Petrosian) variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 f5 Rc1/Queen's Indian/old main line, 7.Nc3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 b5 O-O Bb7 Qe2 Nf6 f4 Nxd4/Sicilian/Taimanov variation
d4 Nf6 Nf3 b6 e3 Bb7 Bd3 e6 O-O c5 Nbd2 Be7 b3 Nc6 a3 exd4 O-O/Queen's Indian defence/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 c5 c4 Nc6 Nc3 Nxd4 Nxd4 Qxd4 Be6/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Nbd7 Qf3 Nc5 f5/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 Qd2 Be7 O-O-O O-O f4 b5/Sicilian/Najdorf, Byrne (English) attack
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nb3 Be6 Bg5 Nbd7 e3 h6 Bxf6 Nxf6/Queen's pawn game/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 h3 Re8 Be3 a6 dxe5 dxe5/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 Nbd7 O-O g6 a4 f4 Bb7 Bf3 Qc7/Sicilian/Najdorf, Opovcensky variation
e4 c5 Nf3 d6 d4 Nf6 Nc3 cxd4 Nxd4 Nc6 Bg5 e6 Bb5 Bd7 Bxc6 bxc6 Qf3 Rc8 O-O-O Be7/Sicilian/Richter-Rauzer, Margate (Alekhine) variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O h6 Be3 Nxd4 Bxd4 Be7/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 d6 Nc3 O-O O-O Nbd7 d5 e5/Queen's Indian/Capablanca variation
e4 c5 Nf3 d6 Bb5+ Nc6 O-O Bd7 Re1 Nf6 c3 a6 Bf1 Bg4 h3 d4 cxd4 cxd4 e5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 d5/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 O-O Be7 a4 f4 Qc7 Be3 b6/Sicilian/Scheveningen (Paulsen), classical variation
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc5 Nc6 Rd1 Qa5/QGD/Charousek (Petrosian) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O Rc8*/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O h5 h3 Nxd4 Bxd4 Bc5/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 Nbd7 Qd2 c5 d5 Kh7 h3 Nb6/King's Indian/Averbakh system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 f4 e5 Nf3 Qd2 g6 fxe5 dxe5 Qxd8+/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 f4 b5 Nxc6 Qxc6 Be2 Ba3 Bd4 Bxb2/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 a4 a5 h3 b6 Re1/King's Indian/fianchetto without c4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Bd7 d4 Nge7 Be3 Ng6 h4 Be7 g3 h6 Nbd2 Bf6/Ruy Lopez/modern Steinitz defence, Rubinstein variation
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 Nc6 g3 Qb6 Nb3 Bb4 Bg2 Qa6/English/symmetrical, Geller variation
e4 e5 Nf3 Nc6 Bb5 Nf6 d3 d6 c3 Be7 Nbd2 O-O O-O Bd7 Re1 Nf1 Re8 Ng3 Bf8/Ruy Lopez/Berlin defence
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Na3 O-O Nxc4/Neo-Gruenfeld, 5.Nf3/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 O-O O-O f4 d5/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Bg7 Nc2 d6 Be2 Nf6 Nc3 O-O O-O Bd7 Ne3 Rc8/Sicilian/accelerated fianchetto, Maroczy bind, 5...Bg7
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Nxd4 Qxd4 Bc5 Bf4 d6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 e3 Nc6 Nf3 d5 a3 Qa5 O-O-O Be7/Nimzo-Indian/classical, Pirc variation
d4 d5 c4 e6 Nf3 c6 e3 Bd6 Nc3 Nf6 Bd3 Nbd7 e4 dxe4 Nxe4 Nxe4 Bxe4 Nf6/QGD semi-Slav/Chigorin defence
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Nc6 Rb1 b6/Gruenfeld/exchange variation
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 O-O Rc1 Nd7 Bd3 e5/Gruenfeld/exchange variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ c6 cxd5 Nxd5 Bxe7 Nxe7/Queen's Indian/Petrosian system
Nf3 e6 g3 f5 Bg2 Nf6 O-O Be7 c4 O-O Nc3 c6 d4 d5 Bg5 Nbd7 Qd3 Ne4 Bxe7 Qxe7/Dutch/stonewall with Nc3
e4 c6 Nf3 d5 Nc3 Bg4 h3 Bxf3 Qxf3 e6 g3 Nf6 Bg2 Bc5 e5 Nfd7 Qg4 Nxe5 Qxg7 Ng6/Caro-Kann/two knights, 3...Bg4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Nxc6 bxc6 Bd3 d5 O-O Nf6 Bf4 Be7 Re1 O-O/Sicilian/Taimanov variation
d4 Nf6 Bg5 Ne4 Bh4 g5 f3 gxh4 fxe4 c5/Trompovsky attack (Ruth, Opovcensky opening)/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 Qc7 cxd5 exd5/Nimzo-Indian/4.e3, main line with 8...Bxc3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Nc5 f3 h6 Be3 a5/King's Indian/Averbakh system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nge7 Be3 Nxd4 Qxd4b5 Bg2 Nc6 Qd1 Bb7/Sicilian/Taimanov variation
Nf3 c5 e4 Nc6 Bb5 g6 O-O Bg7 Re1 Nf6 c3 O-O d4 cxd4 cxd4 d5 e5 Ne8 h3 Bd7/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O a6 Nxd4 Qc7 e4 d6 b3 Bd7/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Bd6 cxd5 exd5 b4 a6/Nimzo-Indian/4.e3, main line with ...b6
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Qb6 Nb5 Nf6 Be3 Qd8 N1c3 a6 Nd4d6 Be2 e6 O-O Be7/Sicilian defence/
d4 g6 e4 Bg7 Nc3 d6 Nf3 a6 Bg5 b5 a4 b4 Nd5 a5 Bc4 h6 Bh4 Bb7 e5 dxe5/Robatsch defence/two knights variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 e5 d5 c6 Qd2 h5 Bg5/King's Indian/Averbakh system
c4 c6 Nf3 d5 g3 Nf6 Bg2 Bg4 cxd5 Bxf3 Bxf3 cxd5 O-O e6 Nc3Nc6 d3 Be7/English/Caro-Kann defensive system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Na3 Nc6 Nxc4 Be6 b3 Bb2 Bd5 Rc1 O-O/Neo-Gruenfeld, 5.Nf3/
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 O-O Rc1 b6 Bxf6 cxd5 exd5 Qf3 Bb7/QGD/4.Bg5 Be7
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nge7 Nb3 d6 Bg2 Bd7 O-O Nc8 a4 Be7/Sicilian/Taimanov variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 Qe2 Qc7 Rd1 b6/QGA/classical, 6...a6
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qb3 Nc6 a3 Ba5 e3 O-O/Nimzo-Indian/classical, Noa variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 dxc4 Bxc4 Nbd7 O-O h6/Queen's Indian/Petrosian system
e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Bc4 c6 O-O Bg7 Re1 O-O Bb3 Be6 Nd2 Nd7/Alekhine's defence/modern, Larsen variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 cxd4 exd4 a6 a4 Bd7/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 cxd4 Nxd4 Bc5 Nc2 d5 cxd5 Nxd5 O-O O-O a3 a5/Queen's pawn game/
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc5 dxc4 Bxc4 Nd7/QGD/Charousek (Petrosian) variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bg5 Qc2 c5 dxc5 bxc5/Queen's Indian/Yates variation
d4 Nf6 c4 g6 Nc3 d5 Bf4 Bg7 e3 O-O Qb3 c5 cxd5 cxd4 exd4 Nbd7 Be2 Nb6 Bf3 e6/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 11.Bxf6
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4 cxd5 Nxd5 Qc2 Nc6 Be2 O-O O-O Nf6/Caro-Kann/Panov-Botvinnik attack, 5...e6
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Bd6 Na3 Ne4 Nxc4 Nxd2 Nfxd2 Bd7 Nxd6+/Catalan/open, 5.Nf3
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qd3 Bb7 Bg2 Nbd7 O-O a6 Nbd2 c5/Queen's gambit declined/
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 b6 O-O Bb7 cxd5 exd5 Ne5 Re8 a3/Queen's gambit declined/
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8 d5 Na6 Nd4 Bd7 e4 fxe4/Dutch defence/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 h3 c6 a4 a5 Be3 exd4/King's Indian/fianchetto without c4
c4 c6 Nf3 d5 b3 Nf6 g3 Bf5 Bg2 e6 Bb2 Nbd7 O-O Bd6 d3 O-O Nbd2 e5 cxd5 cxd5 Rc1 Qe7/English/London defensive system
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 Nf4 Be2 e5 Nfd5 Nxd5/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 g6 Be3 Bg7 Qd2 O-O Be2 Ng4 Bxg4 Bxg4/Sicilian/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 Rd1 a6 Be2 Be7/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 d6 Nf3 Bg4 Qb3 Qc8 h3 Bxf3 Qxf3 g6 g3 Bg7 Bg2 Nc6 e3 O-O/Old Indian defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 b5 Qf3 Bb7 Bd3 Nbd7 O-O-O Qb6/Sicilian/Najdorf, Polugayevsky variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 Bf5 e3 Nd7 Qe2 a5/Neo-Gruenfeld, 6.O-O c6/
c4 Nf6 Nc3 d5 cxd5 Nxd5 Nf3 g6 e4 Nxc3 dxc3 Qxd1+ Kxd1/English/Anglo-Gruenfeld defense
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O a4 Be7 h3/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 Nf6 Nc3 cxd4 Nxd4 g6 g3 Nc6 Bg2 Bg4 Nde2 Bg7 h3 Bxe2 Qxe2 Rc8/Sicilian/dragon variation
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 Be3 Nc6 Qb6 Qxb6 Bxb6 Nf6 Nc3Bg4 Be2 e6 O-O-O Rc8/Sicilian, Chekhover variation/
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Nbd2 O-O Bg2 b6 O-O Bb7 cxd5 exd5 Ne5 Bd6 Ndf3 Ne4/Queen's pawn game/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 c6 O-O Na6 dxe5 dxe5 Qxd8 Rxd8/King's Indian/Gligoric-Taimanov system
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Bc5 b4 Bb6/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 b4Nce4 Qd4 d5 c5 h6/Nimzo-Indian/classical, 4...c5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 O-O d5 cxd5 cxd5 Ne5 Nc3 Nfd7 f4 Nc6/Neo-Gruenfeld, 6.O-O, main line/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 Qc7 O-O Ne5 Be2/Sicilian/Taimanov variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 Bxc6 dxc6 d3 Bd6 Nbd2 Be6 b3 Nd7 Bb2 c5 Nc4 f6/Ruy Lopez/Treybal (Bayreuth) variation (exchange var. deferred)
c4 c6 e4 d5 exd5 cxd5 d4 Nf6 Nc3 Nc6 Bg5 dxc4 Bxc4 h6 Be3 e6 Nf3 Be7 O-O O-O/Caro-Kann/Panov-Botvinnik attack
e4 c5 Nc3 d6 Nge2 g6 d4 cxd4 Nxd4 Nf6 Be2 Bg7 Nb3 Nc6 Be3 O-O g4 Be6 g5 Nd7/Sicilian/dragon, classical, Nottingham variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 d6 O-O a4 Nf6 Nb3 Be7/Sicilian/Taimanov variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be3 e6 f4 e5 Nf3 Qd2 Ng4 O-O-O Nxe3/Sicilian/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 h3 e6 Be3 b5 Bd3 Bb7 a3 Nbd7 f4 Rc8/Sicilian/Najdorf, Adams attack
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Nc6 O-O Be7 Re1 Bg4 c4 Bxf3 Qxf3 Nxd4/Petrov/classical attack, Chigorin variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 Nb3 Bd3 b5 g4 Bb7/Sicilian/Scheveningen, 6.f4
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qb3 dxc5 Na6 cxd5 Nxc5/QGD/Charousek (Petrosian) variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Bd2 b4/Ruy Lopez/closed, anti-Marshall 8.a4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 a6 f3 b5 a4 b4 Nd5 Nxd5 exd5 Bb7/Sicilian/dragon, 6.Be3
e4 c5 f4 Nc6 Nf3 e6 Nc3 a6 d4 cxd4 Nxd4 Nge7 Nb3 d6 Be3 Bd3 Bb7 O-O Ng6/Sicilian/Grand Prix attack
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O d6 Bxc6+ bxc6 d4 Nxe4 Qe2f5 Nbd2 Nxd2 Nxd2 Be7/Ruy Lopez/Steinitz defence deferred, Rubinstein variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e3 Be6 Ng5 Bd5 e4 h6 exd5 hxg5/Gruenfeld/5.Bf4
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Bd6 b4 dxc4 Bxc4 Nbd7/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 h6 Be3 e6 h3 exd5 exd5 Re8/King's Indian/Averbakh, 6...c5
d4 Nf6 c4 c5 d5 g6 Nc3 Bg7 g3 O-O Bg2 d6 Nf3 e6 O-O exd5 cxd5 Nbd7 Bf4 Ne8/Benoni/fianchetto, 9...Nbd7
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 c4 Nc6 Qe3 g6 Be2 Bg7 h3 Nf6 O-O O-O Nc3 Rb8/Sicilian, Chekhover variation/
e4 d6 d4 Nf6 Nc3 e5 dxe5 dxe5 Qxd8+ Kxd8 Bc4 Be6 Bxe6 fxe6 Be3 Nbd7 f3 a6 Nge2 Bd6/Pirc defence/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bxf6 Qxf6 e3 O-O Nf3 Bg4/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bg5 Qc2 h6 Bxf6 Bxf6/Queen's Indian/Yates variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 e5 Bb5+ Nbd7 Nf5 d5 exd5 a6 Bxd7+ Qxd7 Ne3 b5/Sicilian/Prins variation, Venice attack
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 Nbd7 Nf3/King's Indian/Averbakh system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 g6 e5 dxe5 fxe5 Ng4 e6 f5 Bc4 Bg7/Sicilian/Najdorf, 6.f4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 a6 a4 h6/King's Indian/Saemisch, 5...O-O
e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 Nc6 c4 Nb6 exd6 exd6 O-O Be7 b3 O-O Nc3 f5/Alekhine's defence/modern variation, 4...Bg4
e4 e6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Nf3 Ngf6 Bd3 c5 O-O cxd4 Nxd4 Be7 Re1 O-O c3 a6/French/Rubinstein variation
d4 Nf6 c4 d6 Nc3 e5 Nf3 Nbd7 e4 Be7 g3 O-O Bg2 c6 O-O Re8 h3 Qc7/Old Indian/main line
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e5 Nf3 Nbd7 a4 Bd3 b6 O-O Bb7/Sicilian/Najdorf, 6.f4
d4 d5 c4 e6 Nf3 Nf6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 Qxc4 Qc2 Bb7 Bf4 Nc6/Catalan/closed, 5.Nf3
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 b5 f5 Be7/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
e4 c5 d4 cxd4 Nf3 Nc6 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 Be7 Be2 Rc8/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 9...Be7
d4 Nf6 Nf3 e6 g3 b5 Qd3 a6 Bg5 Be7 e4 Bb7 Nbd2 d6 Bg2 O-O O-O a4 Bc6/Queen's pawn game/
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Bd7 Na3 cxd4 Naxc4 Bc5 Bg5 O-O/Catalan/open, 5.Nf3
c4 c6 Nf3 Nf6 g3 d5 Bg2 Bg4 Ne5 Bh5 cxd5 Nxd5 Nc3 e6 g4 Bg6 h4 Nb4 d3 Qd4 h5 Qxe5 hxg6 fxg6 Be4 Qf6/English/Caro-Kann defensive system
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qb3 Be2/QGD/Charousek (Petrosian) variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 h6 Bxh6 Nxe4 Nxe4 Qh4+/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 Nxd4 Qxd4 d6 Be2 Bg7 Bd2 O-O Qe3 Bd7/Sicilian/accelerated fianchetto, Gurgenidze variation
Nf3 d5 b3 Bg4 Bb2 Nd7 e3 e5 Be2 Bd6 d3/Reti/Nimzovich-Larsen attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e6 Bg2 Be7 O-O b3 Qc7 Bb2 Bd7/Sicilian/Najdorf, Zagreb (fianchetto) variation
d4 Nf6 Nf3 d5 c4 c6 e3 e6 Bd3 Nbd7 O-O Bd6 Nc3 O-O e4 Bxc4 e5 Be3 Qe7/QGD Slav/4.e3
c4 c5 Nf3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nc6 O-O e5 Nc3 Be6 Ng5 Qxg5 Nxd5 Qd8/English/symmetrical variation
d4 Nf6 Nf3 e6 Bg5 c5 c3 h6 Bh4 Nc6 e3 cxd4 exd4 Be7 Nbd2 O-O Bc4 d5 Bd3 Qb6/Queen's pawn/Torre attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Bb5 Bd7 Bxc6 bxc6 Qf3 h6 Bh4 c5/Sicilian/Richter-Rauzer, Margate (Alekhine) variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 a6 Nge2 b5/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 cxd4 exd4 a6 a4 Nc6/Nimzo-Indian/4.e3, Gligoric system with 7...dc
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O Qd6 d4 exd4 Nxd4 Bd7 Nc3 O-O-O Be3 Qg6 Qe2 Nh6/Ruy Lopez/exchange, Bronstein variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 a4 e5 Nf3 Qc7 Bg5 Nbd7 Nd2 h6 Bxf6 Nxf6/Sicilian/Najdorf
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 cxd4 cxd4 Nc6 Bb5 Bd7/Gruenfeld/exchange variation
e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2 cxd4 cxd4 exf6 Nxf6 Nf3 Bd6 O-O O-O Bf4 Bxf4 Nxf4 Ne4 Nh5 g6 Ng3*/French/Tarrasch, closed variation, main line
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 a3 a6/QGD semi-Slav/Stoltz variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 Nbd7 cxd5 exd5 Be2 O-O O-O Ne4/Queen's Indian/Petrosian system
e4 c5 d4 cxd4 c3 Nf6 e5 Nd5 Qxd4 e6 Bc4 Nc6 Qe4 d6 Nf3 dxe5 Nxe5 Bd6 Nxc6 bxc6/Sicilian/Smith-Morra gambit
c4 f5 g3 Nf6 d4 e6 Bg2 c6 Nh3 d6 O-O Be7 Nc3 O-O e4 e5 dxe5 dxe5 Qxd8 Rxd8/Dutch defence/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 b4Nce4 Qd4 d5 cxd5 O-O/Nimzo-Indian/classical, 4...c5
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qb3 dxc4 Qxc4 O-O e3 Nd5/Queen's Indian/Petrosian system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4Qc7 f4 Qa5+ Bd2 Qb6/Sicilian/Anderssen variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 Bxb4 cxb4 O-O O-O Nbd2 Qe7 Qb3 a5/Queen's Indian/Capablanca variation
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 g6/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 Nb3 g4 b5 g5 b4/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 c4 Nc6 O-O Nf6 Nc3 Nd4 d3Nxf3+ Qxf3 g6 Qe2 Bg7/Sicilian/Canal-Sokolsky attack, Sokolsky variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f3 Nbd7 g4 b5 g5 b4/Sicilian/Najdorf, Byrne (English) attack
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Be7 b3 c5 Bb2 Nc6/Nimzo-Indian/4.e3, main line with ...b6
c4 c5 Nc3 Nf6 Nf3 d5 cxd5 Nxd5 d4 cxd4 Qxd4 Nxc3 Qxc3 Nc6/English/symmetrical, three knights system
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 exd4 Qxd4 Nf6 Qxd8+ Kxd8 Nc3 Be6 Ne5 Nc6 Nxc6+/QGA/3.e4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Nc3 b4/Ruy Lopez/closed, anti-Marshall 8.a4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 e5 a3 exd4 axb4 dxc3 bxc3 Bf5 Qa2 Qxa2/Nimzo-Indian/classical, Noa variation
e4 e5 Nf3 Nc6 Nc3 g6 d4 exd4 Nd5 Bg7 Bg5 Nce7 Bc4 c6 Nxe7 Nxe7 O-O h6 Bh4 O-O/Three knights/Steinitz, Rosenthal variation
d4 f5 c4 Nf6 g3 d6 Nf3 g6 Bg2 Bg7 d5 Na6 O-O O-O Nc3 Nc5 Nd4 e5 dxe6 c6/Dutch with c4 & g3/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 a3 Bxc3+ bxc3 Ba6 cxd5 Bxd3 Qxd3 Qxd5/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 Nc6 Nge2 Bd7 h4 h5 O-O-O b5/King's Indian/Saemisch, 5...O-O
c4 Nf6 Nc3 e6 Nf3 Bb4 Qc2 c5 a3 Ba5 g3 Nc6 Bg2 O-O O-O d3 d6/English/Nimzo-English opening
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 Nc6 c4 e6 Nc3 Be7 Be3 Be2 Re8 O-O d5/Sicilian/Prins (Moscow) variation
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 O-O Nf3 Qa5 Rb1/Gruenfeld/exchange variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Ne5 c6 Bf4 dxc4/Queen's Indian/Riumin variation
c4 e5 Nc3 Nc6 Nf3 Nf6 g3 Nd4 Bg2 Nxf3+ Bxf3 Bb4/English/four knights, kingside fianchetto
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Qe2 b5 Bd3 cxd4 exd4 Bb7/QGA/classical, 7...b5
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 dxc4 Qxc4 b5 Qc2 Bb7 e4 Nbd7 Nbd2 a6 a4 h6/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Nxd4/Sicilian/Sozin, Leonhardt variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 O-O/Nimzo-Indian/classical, Noa variation, 5.cd ed
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Bd7 O-O g6 d4 Bg7 Re1 Nge7 Be3 O-O Nbd2 h6/Ruy Lopez/modern Steinitz defence
e4 d6 Nc3 g6 d4 Nf6 f3 c6 Be3 b5 Qd2 Nbd7 Nh3 Qa5 Nf2 a6 Be2 Bg7 O-O O-O/Pirc defence/
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Bd6 Nc3 O-O Qxc4 e5 d5 Ne7/Catalan/open, 5.Nf3
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 Be7 Ne5 Rb8 Nxd7 Qxd7 Qxc4 b5/Queen's pawn game/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Qb6 Nb3 Nf6 Nc3 e6 Qe2 Bb4 Bd2 O-O a3 Bxc3 Bxc3 e5/Sicilian defence/
e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 c6 Bc4 Nd7 Nf3 N7f6 h3 Bf5 O-O h6 Bb3 e6/Alekhine's defence/modern, Larsen variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 e3 Qd6 Bd3 O-O/Gruenfeld/5.Bg5
c4 c5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nc7 Nf3 Nc6 d3 e5 Nd2 Bd7 Nc4 b5 Ne3 Rc8 O-O Nd4 f4 exf4 gxf4 Be7/English/symmetrical, Rubinstein system
e4 g6 d4 d6 Nc3 Bg7 Be3 c6 Qd2 Nd7 f4 b5 Nf3 Ngf6 e5 b4 exf6 bxc3 Qxc3 Nxf6/Robatsch (modern) defence/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4 Bxe4 Ne1 d5 Qa4 Qd7/Queen's Indian/old main line, 7.Nc3
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3Ne4 Qc2 Nxc3 Ng5 Qxg5/Bogo-Indian defence, Monticelli trap/
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 e5 b4 exf6 bxc3 bxc3 fxe7 Bxe7 Bxc4 Nb6 Bb5+/QGA/Linares variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 dxc4 Bxc4 Nbd7 O-O a6/Queen's Indian/Petrosian system
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxc3 bxc3 Qxd5 e3c5 Bb5+ Nc6/Gruenfeld/5.Bg5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 Qb3 Qb6 h3/King's Indian/fianchetto without c4
Nc3 d5 e4 d4 Nce2 e5 Ng3 Be6 Nf3 f6 Bb5+/Dunst (Sleipner, Heinrichsen) opening/
e4 c6 d4 d5 e5 Bf5 h4 Qb6 g4 Bd7 h5 h6 f4 e6 Nf3 c5 c3 Nc6 Rh2 cxd4/Caro-Kann/advance variation
c4 e6 Nf3 d5 g3 Nf6 Bg2 Be7 O-O O-O b3 c5 Bb2 Nc6 e3 d4 exd4 cxd4 Re1 Qb6 d3 Re8 Na3 e5 Nc2 Bf8/English/Neo-Catalan declined
d4 e6 c4 f5 g3 Nf6 Bg2 d5 Nf3 c6 O-O Bd6 b3 Qe7 a4 O-O Ba3 Bxa3 Nxa3 a5/Dutch defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Nc6 f3 Bg7 Bc4 O-O Qd2 Bd7 g4 Qa5/Sicilian/dragon, Yugoslav attack, 9...Bd7
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 Nbd7 cxd5 exd5 Bd3 c5/Queen's Indian/Petrosian system
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Qa5 Bd2 Nxc5 Nf3 d6 Nb5 Bxd2+ Nxd2 Qd8/Nimzo-Indian/classical, 4...c5
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bf4 Nxc3 bxc3 c5 e3 O-O Rb1 cxd4 cxd4 Nc6/Gruenfeld/5.Bg5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 Nc3 h3 c6/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 Nbd7 Qe2 a6 a4 b6/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Bd5 Qd3 Be4 Qd1 c5 Nc3 Bc6/Queen's pawn game/
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nf6 Ne5 Bh7 Bd3 Bxd3 Qxd3 e6/Caro-Kann/classical, 6.h4
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 e4 Nge7 Nge2 O-O/English/Botvinnik system
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 Nf3 Nf6 O-O O-O Rb1 a5/English/closed system
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 O-O Nf3 d5 O-O dxc4 Bxc4 Nc6 a3 Ba5 Bd3 cxd4/Nimzo-Indian/4.e3, Gligoric system with 7...dc
e4 c6 d4 d5 Nd2 dxe4 Nxe4 Nf6 Nxf6+ gxf6 c3 Bf5 Nf3 e6 g3 Qd5 Bg2 Qc4 Be3 Nd7/Caro-Kann/Bronstein-Larsen variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5 exd5 exd5 Bd3 O-O/Sicilian/Anderssen variation
e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O O-O d4 Bb6 Bg5 h6 Bh4 d6 a4 a5 Bxc6 bxc6/Ruy Lopez/classical defence, Benelux variation  
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 Bf4 Ba6 Nf3/QGA/Linares variation
b3 d5 Bb2 c5 e3 Nc6 Bb5 Qc7 f4 a6 Bxc6+ Qxc6 Nf3 Nf6 O-O g6 d3 Bg7/Nimzovich-Larsen attack/classical variation
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qd2 Rd1 b6 cxd5 cxd5/QGD/Charousek (Petrosian) variation
d4 Nf6 c4 e5 dxe5 Ng4 Bf4 Nc6 Nf3 Bb4+ Nbd2 Qe7 a3 Ngxe5 Nxe5 Nxe5 e3 Bxd2+ Qxd2 d6/Budapest/Rubinstein variation
e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4 Nxd4 cxd4 Ne2 Qb6 Ba4 Nf6 d3 O-O O-O d6/Sicilian/Grand Prix attack
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bxf6 Qxf6 e3 O-O a3/Nimzo-Indian/classical, Noa variation, 5.cd ed
c4 f5 Nf3 Nf6 g3 g6 Bg2 Bg7 d4 O-O O-O d6 d5 Na6 Nc3 Qe8 Rb1 c5 dxc6 bxc6/Dutch/Leningrad, main variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 Qc7 Bd3 b5 Qf3 g4 e6 g5 Nfd7/Sicilian/Najdorf, 6.f4
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 c4 Nc6 Qd2 g6 b3 Bg7 Nc3 Bg4 Bb2 Bxf3 gxf3 Nd4/Sicilian, Chekhover variation/
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 Nc6 Qa4 Bd7 Qxc4 Na5 Qd3 c5 Ne5 Nc6 O-O cxd4/Catalan/open, 5.Nf3
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Qc2 Na6 Bg5 Nb4 Qd1 Bf5 Rc1 Qa5 Bxf6 gxf6/Queen's gambit declined/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be2 a6 Be3 b5 Nxc6 Qxc6 O-O Bb7 Bf3/Sicilian/Taimanov variation
e4 c5 Nf3 Nc6 Bb5 e6 O-O Nge7 Nc3 a6 Bxc6 Nxc6 d4 cxd4 Nxd4 Qc7 Re1 d6 Nxc6 bxc6/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O Bd6 Nbd2 O-O e4 dxe4 Nxe4 Nxe4 Bxe4 c5/QGD Slav/4.e3
e4 e6 d4 d5 Nc3 Bb4 Bd3 dxe4 Bxe4 Nf6 Bf3 c5 Ne2 Nc6 a3 Bxc3+ bxc3 cxd4 cxd4 e5/French/Winawer (Nimzovich) variation
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Nxd7 c4 Ngf6 Nc3 e6 O-O Be7 d4cxd4 Qxd4 a6 b3 O-O/Sicilian/Canal-Sokolsky attack, 3...Bd7
e4 e6 d4 d5 e5 c5 c3 Qb6 Nf3 Bd7 Be2 cxd4 cxd4 Bb5/French/advance, Wade variation
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 e6 Nf3 exd5 e5 Nfd7 Bg5 Bxe7 Qxe7 Nxd5 Qd8/QGA/3.e4
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Qc2 Nh5 Bxe7 Qxe7 Nge2 g6/QGD/exchange, positional line
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 f5 d5 Bf6/Queen's Indian/old main line, 9.Qxc3
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 Be6 Nbd2/Neo-Gruenfeld, 6.O-O c6/
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 Bg4 c3 Bd6 Be3 Ne7 Nbd2 Qc8 Qc2 O-O/Ruy Lopez/exchange, Gligoric variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O Bd6 Nxc6 bxc6 f4 e5/Sicilian/Taimanov variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6/QGA/classical variation
e4 c5 Nf3 d6 Be2 Nf6 Nc3 g6 d4 cxd4 Nxd4 Bg7 Be3 Nc6 Nxc6 bxc6 e5 dxe5 Qxd8+ Kxd8/Sicilian/dragon, classical attack
Nf3 d5 g3 Nf6 Bg2 c6 O-O Bg4 b3 Nbd7 Bb2 e6 d3 Bd6 Nbd2 Qe7/Reti/King's Indian attack, Yugoslav variation
e4 c5 Nf3 d6 Bb5+ Nd7 d4 Nf6 Nc3 cxd4 Qxd4 e5 Qd3 h6 O-O a6 Bc4 b5 Bd5 Rb8/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 dxe5 Nxb5 a4 Nbd4 Nxd4 Nxd4 Qxd4 d5 Qd3 c6/Ruy Lopez/open Berlin defence, l'Hermet variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Nb8 d3 Nbd7/Ruy Lopez/closed, Breyer defence
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Be2 Be7 O-O O-O Be3 Bd7 Nb3 Rc8/Sicilian/modern Scheveningen, main line with Nb3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Nc6 Rg1 h5 gxh5 Nxh5 Be3 Nf6/Sicilian/Scheveningen, Keres attack
d4 d5 c4 e6 Nc3 c6 e3 f5 Bd3 Nf6 Qc2 a6 Nge2 Bd6 f3 O-O Bd2 b6 O-O Qc7/QGD/semi-Slav
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 b5 Qd3 Na6 a3 Bg2 Bc6 O-O Qb6/Queen's pawn game/
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Bd5 Qa4+Qd7 Qd1 Nc6 Nc3 Bb4/Queen's pawn game/
d4 Nf6 Nf3 b6 Nc3 Bb7 Bg5 d5 e3 e6 Ne5 Be7 Bb5+ c6 Bd3 Nbd7 f4 a6/Queen's Indian defence/
c4 e5 Nc3 Nf6 g3 c6 Nf3 e4 Nd4 d5 cxd5 cxd5/English/Bremen system, Keres variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Be7 g3 c6 Bg2 Be6/Nimzo-Indian/classical, Noa variation
d4 f5 Nf3 Nf6 g3 g6 b3 Bg7 Bb2 O-O Bg2 d6 O-O Ne4 c4 Nc6 Nc3 Nxc3 Bxc3 Qe8/Dutch/
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qc2 dxc4 e3 O-O Bxc4 c5/Queen's Indian/Petrosian system
d4 e6 c4 f5 g3 Nf6 Bg2 c6 Nf3 d5 O-O Bd6 Qc2 O-O Bf4 Bxf4 gxf4 Ne4 e3 Qe7/Dutch defence/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 Bd2 a6 Nxd5 Nxd5 cxd5 Bxd2/Nimzo-Indian/4.e3, main line with ...b6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bd3 O-O Nf3 Qb6/Sicilian/Scheveningen, 6.f4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Nc3 Na5/Ruy Lopez/closed, anti-Marshall 8.a4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nb3 Be7 O-O O-O Kh1 a6 a4 b6/Sicilian/Boleslavsky variation, 7.Nb3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Qf3 Nc6 Bb5 Bd7 Bxc6 bxc6/Sicilian/Scheveningen, Keres attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Be3 Nc6 Qf3 O-O O-O-O Qc7 Ndb5/Sicilian/Scheveningen, Tal variation
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Qa5 Bd2 Qa4 Qb1 Nh3 Nc6 g3 Bd7/French/Winawer, advance variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 c6 Bb2 a5 c4 Nbd7 Qc2 Re8 Rd1 Qc7/King's Indian/fianchetto without c4
e4 e5 Nf3 Nc6 Bb5 Nf6 d3 d6 O-O g6 d4 Bd7 d5 Ne7 Bxd7+ Qxd7 Re1 Bg7 c4 O-O/Ruy Lopez/Berlin defence
d4 Nc6 c4 e5 d5 Nce7 e4 Nf6 Nc3 Ng6 Be3 Bb4 f3 Bxc3+ bxc3 d6/Queen's pawn/Lundin (Kevitz-Mikenas) defence
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O Bd6 h3 Bf4 Bxf4 Qxf4/Sicilian/Taimanov variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 Be7 O-O d5 c3 Nbd7 a4 a6 Nbd2 O-O axb5 axb5/Queen's pawn game/
e4 c5 Nf3 d6 Bb5+ Nd7 d4 Nf6 O-O cxd4 Qxd4 g6 e5 dxe5 Qxe5Bg7 Re1 e6 Qd6 a6/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 c6 Nf3 g6 d4 Bg7 Nbd2 d6 c3 Nf6 Bd3 O-O O-O Nbd7 a4 e5 Re1 Re8 a5 Qc7/Caro-Kann defence/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 e3 O-O b4 b6/Gruenfeld/5.Bg5
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 a3 Bxc3+ bxc3 c5 a4 Bd7 Nf3 Qd2 Nbc6 Bd3 O-O-O/French/Winawer, advance, Smyslov variation
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Nc6 h3 Be7 O-O O-O c4 Nb4 Be2 dxc4/Petrov/classical attack
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Be6 Nc3 Qd7 Nf3 O-O-O O-O Bg4/QGA/3.e4
e4 e5 Nf3 Nc6 Bc4 Bc5 d3 Nf6 Nc3 d6 Bg5 h6 Bxf6 Qxf6 Nd5 Qd8 c3 Bb6 a4 O-O/Giuoco Pianissimo/Canal variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 d6 N1c3 a6 Na3 b5 Nd5 Be7 c4 b4 Nc2 a5/Sicilian/Labourdonnais-Loewenthal (Kalashnikov) variation
e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Be7 O-O O-O Bg5 Bg4 Re1 Re8 Nbd2 Nbd7 c3 h6 Bxf6 Bxf6 Qb3 Nb6/French/exchange variation
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 c4 cxd4 Qxd4 d6 Nc3 e4 O-O b3 Nbd7/Queen's pawn game/
e4 d6 d4 Nf6 Nc3 e5 dxe5 dxe5 Qxd8+ Kxd8 Bc4 Ke8 f3 c6 Be3a5 a4 Na6 Nge2 Bc5/Pirc defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Rg1 d5 exd5 Nxd5 Nxd5 exd5/Sicilian/Scheveningen, Keres attack
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e5 Nb5 Bc5 Nd6+ Ke7 Nxc8+ Qxc8 e3 Rd8 Nc3 d6 Be2 Nc6/English/symmetrical, Benoni formation
d4 f5 g3 Nf6 Bg2 g6 c4 Bg7 Nc3 O-O Nh3 e6 O-O d6 Nf4 c6 Nd3 Nbd7 b3 e5/Dutch defence/
e4 c6 d4 d5 e5 Bf5 Be3 e6 Nd2 Nd7 c3 Qc7 f4 Ne7 Be2 O-O-O Ngf3 h6 O-O f6/Caro-Kann/advance variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 Nc6 Nge2 Rb8 Rc1/King's Indian/Saemisch, 5...O-O
e4 c5 c3 d5 exd5 Qxd5 d4 cxd4 cxd4 Nf6 Nc3 Qd8 Nf3 e6 Bd3 Nc6 O-O Be7 Re1 O-O/Sicilian/Alapin's variation (2.c3)
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Bd3 Nbd7 Qe2 cxd4 exd4 b5 a4 bxa4/QGA/classical, 6...a6
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 d6 c4 Be7 N1c3 a6 Na3 Be6 Be2 Rc8 O-O Bg5/Sicilian/Labourdonnais-Loewenthal (Kalashnikov) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O b5 Qe2 Bb7 Rad1 Ne5/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nge7 Nb3 Ng6 a4 b6 O-O Rb8/Sicilian/Taimanov variation
c4 Nf6 Nc3 e6 e4 c5 e5 Ng8 Nf3 Nc6 d4 cxd4 Nxd4 Nxe5 Ndb5 a6 Nd6+ Bxd6 Qxd6 f6 Bf4 Nf7 Qa3 Ne7/English/Mikenas-Carls, Sicilian variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qc2 dxc4 e3 b5 a4 b4/Queen's Indian/Petrosian system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O Re1 Rc8 Nxc6 Bxc6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qb3 Nc6 Bd2 O-O e3 Bd6 Nb5 e5/Nimzo-Indian/classical, Noa variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bh4 Qd7 Bg3/King's Indian/Gligoric-Taimanov system
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 cxd4 exd4 Be7 O-O O-O Nc3 a6/QGA/classical variation
e4 g6 d4 d6 Nc3 Bg7 Nf3 Bg4 Be2 Nc6 Be3 e5 dxe5 dxe5 Qxd8+Rxd8 Nd5 Rc8 Bb5 Bd7/Robatsch defence/two knights variation
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Qe2 b5 Bd3 exd4 Be7 Bg5 Bb7/QGA/classical, 7...b5
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Ba5 b4 cxb4 Nb5 Nc6 axb4 Bxb4+ c3 Be7 Ba3 Nh6/French/Winawer, advance, 5.a3
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3d6 Qc2 c5 d5 exd5/Queen's Indian/Capablanca variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d6 O-O Qa5 h3 e5 e4 Be6 d5 cxd5/King's Indian/fianchetto, Kavalek (Bronstein) variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 cxd4 Nxd4 Nc6 Qd2 Nxd4 Bxd4 Be6/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bf4 Nxc3 bxc3 c5 e3 O-O cxd5 cxd4 cxd4 Qxd5/Gruenfeld/5.Bg5
d4 Nf6 Nf3 e6 g3 c5 Bg2 d5 O-O Nc6 c4 dxc4 Ne5 Bd7 Na3 cxd4 Naxc4 Nxe5 Nxe5 Qb6/Queen's pawn game/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 Be7 Ne5 O-O Nxd7 Qxd7 Qxc4 b5/Queen's gambit declined/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O d5 Nxd4 Be7 c4 O-O cxd5 Nxd5 Nc3 Nxc3 bxc3 Nd7/Queen's pawn game/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Qa4 Bd7 dxc5 Na5 Qa3 Rc8 b4 cxb3/Catalan/open, 5.Nf3
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 b3 e6 Bb2 Nge7 Qc1 d6 f4 O-O Ne4 e5 fxe5 Nxe5/English/ultra-symmetrical variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Qf6 b4 a6 Re1 Nge7/QGA/3.e4
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O d6 d4 Bd7 Nc3 Be7 Re1 exd4 Nxd4 O-O Bf1 Re8 b3 Nxd4/Ruy Lopez/Berlin defence, hedgehog variation
e4 e5 Nf3 Nc6 Bb5 Nf6 Nc3 Bb4 O-O O-O d3 d6 Bxc6 bxc6 Ne2 Re8 Ng3 d5 Bg5 h6/Four knights/symmetrical variation
d4 Nf6 Nf3 e6 Bg5 c5 c3 h6 Bh4 b6/Queen's pawn/Torre attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nf3 Be7 Bc4 O-O O-O Be6 Bb3 b5/Sicilian/Najdorf, Byrne (English) attack
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Nb8 d4 Nbd7/Ruy Lopez/closed, Breyer, Borisenko variation
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8 Nd5 cxd5 Qb5 Ng5 c6/Dutch defence/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 c6 Nf3 cxd5 e3 O-O Be2 Nc6/Gruenfeld/5.Bg5
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 c5 cxd5 Qxd5 e3 Nc6 Be2 cxd4/Gruenfeld/5.Bg5
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 exd4 Be7 Ne5 Nc6/QGA/classical, 6...a6
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Bc5 b4 Bd6/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 f4 b5 Be3 Nxd4 Qxd4 Nc6 Qb6 Qxb6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qc2 e3 h6 Bh4 dxc4/Queen's Indian/Petrosian system
d4 d5 c4 e6 Nc3 c6 Nf3 dxc4 a4 Bb4 e4 b5 Bg5/QGD/semi-Slav, Noteboom variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 d5 c5 Ne4 g3/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f3 e6 Be3 b5 g4 b4 Nce2 h6 c4 Qc7/Sicilian/Najdorf
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 Nc3 exd4/King's Indian/fianchetto without c4
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O Bd6 Nc3 O-O e4 Nxe4 Nxe4 Bxe4 h6/QGD Slav/4.e3
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O dxc4 Bxc4 b5 Bd3 Bb7 Nc3 a6 e4 c5/QGD Slav/4.e3
e4 g6 d4 Bg7 Nc3 c5 dxc5 Qa5 Bd2 Qxc5 Nd5 Na6 Nf3 Bxb2 Rb1Bg7 Bxa6 bxa6 O-O a5/Robatsch defence/
d4 Nf6 Nf3 e6 Bg5 c5 c3 Nc6 e3 Qb6 Qb3 d5 Nbd2 Bd7 Be2 cxd4 exd4 Qxb3 axb3 Be7/Queen's pawn/Torre attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Be3 h4 O-O Bc4/Sicilian/Scheveningen, Keres attack
e4 g6 d4 Bg7 c3 d6 Nf3 Nf6 Bd3 O-O O-O Nbd7 Re1 e5 Nbd2 a4 a6 Nc4 Bb7/Robatsch defence/Geller's system
d4 d5 c4 e6 Nc3 c6 e4 Bb4/QGD/semi-Slav, Marshall gambit
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qc7 Qe2 O-O-O Nxd4 Rxd4 Be7/Sicilian/Najdorf, 7.f4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 Be3 Nc6 Qd2 Bd7 O-O O-O Rad1 a6/Sicilian/dragon, classical, Amsterdam variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 Bd2 Bxc4 Nbd7 Qe2 a6/Nimzo-Indian/4.e3, main line with ...b6
c4 c5 g3 g6 Nc3 Nc6 Bg2 Bg7 e4 e6 Nge2 Nge7 d3 d6 O-O O-O Be3 Nd4/English/symmetrical, Botvinnik system
Nf3 f5 g3 Nf6 Bg2 g6 O-O Bg7 c4 O-O Nc3 d6 d4 c6 Qc2 Kh8 b3 Be6 Bb2 Bg8/Dutch/Leningrad, main variation with c6
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nf3 Nc6 c4 d4 e3 Bc5 exd4 exd4 Re1+/Queen's pawn game/
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Be6 Nc3 Qd7 Nf3 O-O-O h3 Nb4/QGA/3.e4
e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Bc5 O-O d6 d4 exd4 cxd4 Bb6 d5 Na5 Bb2 Ne7/Evans gambit/Paulsen variation
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Bd7 a3 c4 h4 Nge7 h5 h6/French/advance, Euwe variation
e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 f4 c5 c3 Nc6 Ndf3 cxd4 cxd4 Qb6 h4 Bb4+ Kf2 f6 Be3 Be7 Qd2 O-O/French/Tarrasch, closed variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qc2 Bb7 Bg2 Nbd7 O-O c5 Bg5 Rc8/Queen's gambit declined/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Bc5 Qd3 f5/Ruy Lopez/open, Motzko attack
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 c4 cxd4 Qxd4 d6 Nc3 a6 Bg5 Nbd7 Nd2 Bxg2/Queen's pawn game/
e4 e6 d4 d5 exd5 exd5 Bd3 Nc6 c3 Bd6 Qf3 Be6 Ne2 Qd7/French/exchange variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O h6 Be3 Bd7 f3 b5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 f5 Qc2 Bf6 Rad1 Nxc3/Queen's Indian/old main line, 7.Nc3
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6 Be3 O-O Rc1 Qa5/Gruenfeld/exchange, classical variation
d4 d5 c4 e6 Nf3 c6 e3 Nf6 Nbd2 c5 dxc5 Bxc5 a3/QGD Slav/
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 e4 Bg7 Be2 O-O O-O Na6 Bg5 h6/Benoni/classical, 9.O-O
c4 c6 e4 d5 exd5 cxd5 d4 Nf6 Nc3 g6 Qb3 Bg7 cxd5 O-O Be2 Nbd7 Bf3 Nb6 a4 a5/Caro-Kann/Panov-Botvinnik attack, 5...g6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Qe2 Be7 O-O-O O-O f4 Qc7/Sicilian/Sozin, 7.Be3
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qd1 c5 e3 cxd4 exd4 O-O Bd3 Qh5/Nimzo-Indian/classical, Noa variation
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 Nf3 h6 Bxf6 Bxf6 e3 O-O Qb3 cxd5 cxd4 Nxd4 Bxd4/QGD/4.Bg5 Be7
d4 d5 c4 e6 Nf3 c6 e3 f5 Nc3 Nf6 Be2 Bd6 O-O Ne4 Ne5 O-O f3 Nxc3 bxc3 b6/Queen's gambit declined/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 dxc4 Qa4+ Qd7 Qxc4 b6 Bg3/Gruenfeld/5.Bg5
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 cxd4 exd4 b6 Re1 Bb7/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 a6 O-O Qc7 Nb3 Be7 Bf4 d6 c4 Nbd7 Nc3 O-O/Queen's pawn game/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bh4 Qd7 O-O f5/King's Indian/Gligoric-Taimanov system
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7 O-O Nc6 Re1 Bg4 c4 Nf6 cxd5 Qxd5/Petrov/classical attack, Chigorin variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Nf3 Be7 Bd3 Nb4 O-O Nxd3 cxd3 O-O/Sicilian/Scheveningen, 6.f4
e4 g6 d4 Bg7 Nc3 c6 Nf3 d6 Be3 Qb6 Rb1 Nf6 h3 Qc7 Qd2 O-O Bd3 e5 O-O Re8/Robatsch defence/two knights, Suttles variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 a6 a4 Re8/King's Indian/Saemisch, 5...O-O
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 Nf6 Qe2 cxd4 exd4 Nc6 O-O Be7 Rd1 Nb4/QGA/classical variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 b5 cxb5 a6 a4 Qa5 Bd2 Nbd7/King's Indian/Averbakh, 6...c5
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 e5 b5 Qb3 Nfd7 e6 fxe6/Gruenfeld/Russian, Alekhine (Hungarian) variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 d6 f3 Nd7 Bb3 Nb6 h4 h5/Sicilian/accelerated fianchetto, modern variation with Bc4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 a6 Be3 Be7 f4 g4/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 d6 O-O a4 Nf6 Nde2/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Rc1 c5 Bf4 cxd4/Queen's Indian/Riumin variation
d4 Nf6 Nf3 d5 c4 dxc4 e3 e6 Bxc4 c5 Qe2 cxd4 exd4 Nc6 O-O Be7 Be3 O-O Nc3 Qa5/QGA/classical variation
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 c4 cxd4 Qxd4 d6 Nc3 a6 e4 Nbd7 Qe3 Be7/Queen's pawn game/
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 cxd4 cxd4 Be7 Bg5 O-O Qd3 Qb6 Nbd2 Nc6/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bh4 c5 dxc5 g5 Bg3 Ne4 e3 Qa5/Nimzo-Indian/classical, Noa variation, 5.cd ed
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 g3 Nc6 Bg2 Nxd4 Qxd4 Bg7 O-O O-O Qb4 Rb8/Sicilian/dragon variation
e4 c5 Nf3 d6 Nc3 Nf6 d4 cxd4 Nxd4 a6 Be3 e6 Bd3 b5 f4 Bb7 Qf3 Nbd7 O-O Rc8/Sicilian/Najdorf, Byrne (English) attack
e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O e5 dxe5 dxe5 Qxd1+ Kxd1Rd8+ Bd3 Nd5 Nxd5 Rxd5/Pirc/Austrian attack, 6.e5
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bxf6 Bxf6 Qc2 Nc6 Be2/QGD/Neo-orthodox variation, 7.Bxf6
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Qe2 b5 Bd3 exd4 Be7 a4 bxa4/QGA/classical, 7...b5
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Bd7 Qxc4 c5 dxc5 Bc6 Nc3 Nbd7 Be3 Rc8 Bg2 Nd5/Queen's gambit declined/
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 Nbd7 Bd3 Nf8 Qc2 g6 Nge2 Ne6 Bh4 c6/QGD/exchange, positional line
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 Nxd5 Be6 Nxf6+ Bxf6/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 d6 f3 Qb6 Bb5 Qc7 Qd2 Bd7/Sicilian/accelerated fianchetto, modern variation with Bc4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 dxc5 Qa5 Bd2 dxc5 e5 Nfd7 f4 Nc6/King's Indian/Averbakh, 6...c5
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 Nc6 a3 a6 Rc1 Re8/QGD/Charousek (Petrosian) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 Nb3 Bd3 Be7 Be3 Qc7/Sicilian/Scheveningen, 6.f4
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 Bb4 Bd2 Nc6 a3 Be7 Bg5 O-O e3 d5 Be2 h6 Bh4/English/symmetrical variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 f4 b5 Nxc6 Qxc6 Be2 Bb7 Bf3 Rc8/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Qc7 Be3 b5 Nxc6 Qxc6 e5 Bb7 Bf3 Qc7/Sicilian/Taimanov variation
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 Bxc4 e6 Qb3 Bxf3 gxf3 b5 Be2 c5/QGA/Alekhine defence
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Bg4 f3 Be6 Nbc3 Nb4 Be4 c6/QGA/3.e4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Bd7 Qd2 Rc8 O-O-O Nxd4 Qxd4 Rxc3 Qxc3 Nxe4/Sicilian/Richter-Rauzer, Larsen variation, 7.Qd2
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O Nxc6 Bxc6 a4 Nf6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O O-O Ne4 Qc2 Nxc3 Qxc3 f5 Ne5/Queen's Indian/old main line, 9.Qxc3
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 dxc4 Bxc4 Bb7 O-O c5/QGD/Tartakower (Makagonov-Bondarevsky) system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 Nb3 g4 b5 g5 Nfd7/Sicilian/Scheveningen, 6.f4
c4 f5 Nf3 Nf6 g3 d6 d4 e6 Bg2 Be7 O-O O-O Nc3 Qe8 Qc2 Qh5 Re1 Nc6 d5 Nb4/Dutch/Ilyin-Genevsky variation with Qc2
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 dxc4 Qa4+ Nd7 e3 c6/Gruenfeld/5.Bg5
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 c5 c3 Na6 Bxf6 gxf6 O-O Qb6 Nbd2 d5 a4 Be7/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bf4 Nc3 Ne4 Rc1 d6/Queen's Indian/Yates variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 e3 a5 Be2 O-O/Gruenfeld/5.Bg5
d4 d5 c4 e6 Nf3 c6 e3 f5 Be2 Nf6 O-O Bd6 b3 Qe7 a4 a5 Ba3 Bxa3 Nxa3 O-O/Queen's gambit declined/
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Qc2 Na6 a3 Nc7 Bg5 e3 Bf5 Bd3 Bxd3/Queen's gambit declined/
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Nc6 Rc1 cxd4/Gruenfeld/exchange variation
c4 e5 Nc3 Nf6 g3 Bb4 Bg2 O-O Nf3 Re8 O-O e4 Ne1 c6/English/Bremen, Smyslov system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e6 Bd3 b5 a3 Bb7 f4 Nbd7 Qf3 Nc5/Sicilian/Najdorf, Byrne (English) attack
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 O-O a6 e3 Bd7 Qe2 b5 Nc3 Be7 Ne5 Nxe5/Catalan/open, 5.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 b5 Nxc6 Qxc6 O-O Bb7 Qe2/Sicilian/Taimanov variation
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Nc6 a3 Bd6 Nbd2 O-O/QGA/classical variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Bd2 a6 Rc1 Bd6/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e3 c5 Bxc4 cxd4 Nxd4 Bd7 O-O/Gruenfeld/5.Bf4
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Nxc6 Qf6 Qd2 dxc6 Nc3 Bd4 Bc4 Be6 Bxe6 fxe6 O-O O-O-O/Scotch game/
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Nb3 Bb6 a4 Qf6 Qe2 a6 Nc3 Nge7 Nd5 Nxd5 exd5+ Ne7/Scotch/Potter variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be3 e5 Ndb5 a6 Na3 b5 Nd5 Rb8 Nxf6+ Qxf6/Sicilian/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 O-O-O Nb6 Qc5 e6/Gruenfeld/Russian, Smyslov variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O cxd5 Nxd5 Qc2 Nd7/Queen's Indian/Riumin variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 Bd7 Qd2 Rc8 O-O-O h6 Bxf6 gxf6 Nf5 Qa5/Sicilian/Richter-Rauzer, Larsen variation, 7.Qd2
e4 d6 d4 Nf6 Nc3 g6 Be3 c6 Qd2 b5 Bd3 Nbd7 Nf3 e5 dxe5 dxe5 h3 Bg7 a4 b4/Pirc/150 attack
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 cxd4 cxd4 Nc6 Rd1 Qa5/Gruenfeld/exchange variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Rg1 d5 Bb5+/Sicilian/Scheveningen, Keres attack
e4 c5 Nf3 Nc6 Bb5 d6 O-O Bd7 Re1 Nf6 c3 a6 Bf1 e5 h3 Be7 d4 O-O dxc5 dxc5/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nbd2 b5 Ne5 Nd5 Nxd7 Qxd7/Catalan/open, 5.Nf3
d4 e6 c4 f5 Nf3 Nf6 g3 Be7 Bg2 O-O O-O d5 b3 c6 Bb2 Bd7 Nbd2 Be8 Ne5 Nbd7/Dutch/stonewall, Botwinnik variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 Nbd2 O-O c4 Ne4 b3 c5 Bb2 Nxd2 Qxd2 dxc4/King's Indian/fianchetto without c4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 c4 O-O cxd5 cxd5 Ne5 Nbd7 Nc3 e6 Bg5 Qa5/Neo-Gruenfeld, 6.O-O, main line/
e4 d6 d4 Nf6 Nd2 g6 Ngf3 Bg7 Bd3 O-O O-O Nc6 c3 Nh5 Nc4 dxe5 Nxe5 Nfxe5 dxe5/King's pawn opening/
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 c4 cxd4 Qxd4 d6 Nc3 a6 Rd1 Nbd7 Ng5 Bxg2/Queen's pawn game/
e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3 Bg4 dxc5 Qxc5 h3 Bh5 Na3 Nbd7 Be3 Qc8 g4 Bg6/Sicilian/Alapin's variation (2.c3)
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 O-O Nxd4 Qxd4 Nc6 Qd3 Bc5 a3 O-O/Sicilian/Taimanov variation
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d3 d5 cxd5 Nxd5 Nxd5 Qxd5/English/symmetrical, main line with d3
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 a6 Rd1 b5/QGD semi-Slav/Stoltz variation
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 Nbd7 Bd3 O-O Nf3 Re8 Qc2 Nf8 h3 c6/QGD/exchange, positional line
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nb3 Be6 c4 cxd5 Nxd5 N1d2 Be7/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Qc7 O-O b5 a3/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4Qc7 f4 Qb6 c4 Bb4+/Sicilian/Anderssen variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 Qd3 Be7 O-O-O Nbd7 f4 Qc7 Be2 h6/Sicilian/Najdorf, 6...e6
d4 d5 c4 e6 Nc3 c6 Nf3 dxc4 e3/QGD/semi-Slav, Noteboom variation
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Be2 Bb7 a4 b4 Nbd2 e6 O-O c5 Nc4 Nc6/QGA/Alekhine defence
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Bg5 Bf5 Qb3 Nbd7 e4 Bxe4 Nxe4 dxe4 Bc4 Qe7/Queen's gambit declined/
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O O-O Na6 e4 Nc7/Benoni/fianchetto variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd2 Qxb2 Rb1 Qa3 Be2 Be7/Sicilian/Najdorf, Poisoned pawn variation
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Nd2 Nbd7 e4 a6 a4 Bg7 Be2 O-O/Benoni/Nimzovich (knight's tour) variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 O-O d6 b3 e5 dxe5 dxe5 Ba3 Re8/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bg5 h6 Bh4 a6 a4 g5 Bg3 Nh5/Benoni/Uhlmann variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 Nc6 Qd2 a6 Nge2 Bd7 Nc1 Qb8 Nb3 Nd8/King's Indian/Saemisch, 6...Nc6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 a6 g4 b5 Qd2 Bb7 O-O-O Nbd7/Sicilian/dragon, Yugoslav attack
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Bg4 f3 Be6 Nbc3 Bc4 Bxc4 Nxc4/QGA/3.e4
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 Na6 a4/Queen's pawn game/
e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Qxd4 e6 Nf3 Nc6 Qe4 d6 Bb5 c4 Nb6 exd6 Bxd6/Sicilian/Alapin's variation (2.c3)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Be2 e5 Nf3 h6 O-O Be7 Re1 O-O h3 Kh8/Sicilian/Boleslavsky variation
Nf3 g6 e4 c5 d4 cxd4 Nxd4 Bg7 c4 Nc6 Be3 Nf6 Nc3 Ng4 Qxg4 Bxd4 Bxd4 Nxd4 O-O-O e5/Sicilian/accelerated fianchetto, Breyer variation
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Qa5 Bd2 Qa4 Nf3 Nc6 Qb1 c4 g3 Nge7/French/Winawer, advance variation
e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 e6 h3 Bh5 c4 Nb6 exd6 Nc3 N8d7 O-O Be7/Alekhine's defence/modern variation, 4...Bg4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 h3 Nc6 Bc4 O-O Bb3 Bd7 O-O Qc7/Sicilian/dragon, 6.Be3
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qb3 Rd1 Nd7 Bd3 Rb8/QGD/Charousek (Petrosian) variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e5 Nf3 Nbd7 Bd3 O-O Bb7 a3 g6/Sicilian/Najdorf, 6.f4
e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 cxd4 d6 Nf3 Nc6 Nc3 dxe5 dxe5 Nxc3 Qxd8+ Kxd8 bxc3 Bg4/Sicilian/Alapin's variation (2.c3)
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bf4 Nc3 Ne4 Na4 d5/Queen's Indian/Yates variation
d4 Nf6 Nf3 d5 c4 e6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 Qxc4 Qc2 Bb7 Bg5 Be4/Catalan/closed, 5.Nf3
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nf3 h6 Be3 Be7 Qd2 Be6 Rd1 a6/Sicilian/Boleslavsky variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bc1 Nc6 h3 exd4/King's Indian/Gligoric-Taimanov system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O d5 Bb4 Bd2 c6 dxe6 dxe6 O-O/Queen's Indian/anti-Queen's Indian system
e4 e6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Nf3 Ngf6 Bd3 Nxe4 Bxe4 Nf6 Bg5 Qd6 Bxf6 gxf6 Qe2 Bd7/French/Rubinstein variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qc2/King's Indian/Averbakh system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Nbd7 Nf3 b5*/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 d6 d4 cxd4 Qxd4 Bd7 c4 Nc6 Qd2 Nf6 Nc3 g6 b3 Bb2 O-O Be2 a6/Sicilian, Chekhover variation/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 c5 b3 cxd4 exd4 Nc6 Bb2 Bd3 dxc4 bxc4 Nxd4/QGD Slav/
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 a3 Bxc3+ bxc3 c5 Nf3 b6 Ng5 h6 Qh5 g6 Qh3 Qc7/French/Winawer, advance, positional main line
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 b3 O-O O-O d6 Bb2 Nc6 d5 Nb4 c4 a5 Nd4 Bd7/Dutch defence/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 e6 Nf3 h6 Bh4 exd5 cxd5 a6/King's Indian/Averbakh, main line
d4 f5 Nf3 Nf6 g3 g6 c4 Bg7 Nc3 O-O Bg2 d6 O-O Qe8 d5 a5 Be3 h6 c5 Na6/Dutch/
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 b6 O-O Bb7 Ne5 Nc6 Nxc6 Bxc6 Qc2 Qe8/Queen's gambit declined/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nb3 Be6 c4 cxd5 Nxd5 Bd2 Be7/Queen's pawn game/
d4 f5 Nf3 Nf6 c4 g6 g3 Bg7 b4 O-O Bb2 c6 Bg2 Ne4 O-O a5 b5 cxb5 cxb5 a4/Dutch/
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 d5 c5 Ne4 Bd2 Nxd2 Qxd2 b6 a3 Bxc3/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6 Na3 b5 Nd5 Be7 Nxe7 Qxe7/Sicilian/Pelikan, Chelyabinsk variation
d4 d6 e4 Nf6 Nc3 g6 Be2 Bg7 Nf3 c6 O-O O-O a4 a5 Be3 Na6 Nd2 Nb4 Ncb1 e5/Pirc/classical system, 5.Be2
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxc3 bxc3 Qxd5 e3c5 Bb5+ Bd7 c4 Qe4/Gruenfeld/5.Bg5
e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 Nd7 O-O Bg6 c3 Rc8 Nbd2 Nh6 Nb3 Nf5 Bd2 Be7/Caro-Kann/advance variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Qb6 Nb3 e6 Be2 a6 O-O Qc7 f4 Be7/Sicilian/Richter-Rauzer
e4 c6 d4 d5 e5 Bf5 Be3 e6 Nd2 Nd7 Ngf3 Bg6 Be2 Nh6 O-O c4 Nxe3 fxe3 Be7/Caro-Kann/advance variation
e4 c6 d4 d5 e5 Bf5 c4 e6 Nc3 Ne7 Nge2 dxc4 Ng3 Nd7 Bxc4 Nb6 Bb3 Qd7 O-O Bg6/Caro-Kann/advance variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 Qb3 dxc5 Qa5 Qb6 Qxb6/Gruenfeld/Russian, Alekhine (Hungarian) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 e4 Nxc3 bxc3 c5 Rb1 O-O Be2 cxd4 cxd4 Qa5+/Gruenfeld/modern exchange variation
c4 e5 Nc3 Nc6 Nf3 f5 d4 e4 Bg5 Be7/English/three knights system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 Qe8/King's Indian/Averbakh system
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Bg5 Bg7 Nd2 a6 a4 O-O e4 Re8/Benoni/Uhlmann variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 Nbd2 Nbd7 b3 a5 a4 b6 Bb2 Bb7/Neo-Gruenfeld, 6.O-O c6/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Be2 Be7 O-O Bf3 O-O Be3 Nc6/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 g3 Nc6 Nde2 Bg7 Bg2 O-O h3 Rb8 a4 a6/Sicilian/dragon variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O Bd7 f3 Be7 Kb1 O-O/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
e4 e5 Nf3 Nf6 d4 Nxe4 Bd3 d5 dxe5 Be7 O-O Nc5 Be2 O-O Be3 Nc6 Nc3 Be6 Nb5 Nd7/Petrov/modern attack, Symmetrical variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 O-O cxd4 Nxd4 Qb6 Nxc6/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Ne5 c6 Qa4 a6/Queen's Indian/Riumin variation
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 c4 Nc6 Qd2 Nf6 Nc3 e6 Be2 O-O O-O b3 Bd7/Sicilian, Chekhover variation/
d4 Nf6 Nf3 d5 c4 e6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 a4 Bd7 Qxc4 Bc6 Bg5 Bd5/Catalan/closed, 5.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Nbd7 Nf3 O-O Bg7 a4 O-O/Sicilian/Scheveningen, 6.f4
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Bg5 Na6 Nbd2 Be7 c3 Qc2 cxd4 cxd4 Nb4/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Nf3 Be7 Bd3 O-O O-O Nb4 Qe1/Sicilian/Scheveningen, 6.f4
d4 d6 c4 g6 Nc3 Bg7 e4 e5 Nf3 exd4 Nxd4 Nc6 Be3 Nge7 Be2 O-O O-O f5 Nxc6 bxc6/Modern defence/Averbakh system
d4 d5 c4 e6 Nf3 c6 e3 f5 Nc3 Nf6 Be2 Bd6 Qc2 O-O O-O Nbd7 Rb1 Ne4 b4 a6/Queen's gambit declined/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Bd2 Bd6/Nimzo-Indian/4.e3, main line with ...b6
c4 e5 Nc3 Nc6 g3 f5 Bg2 Nf6 d3 Bb4 Bd2 O-O/English/Sicilian reversed
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Bg4 Rb1 a6/Gruenfeld/exchange variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 Be7 O-O-ONxd4 Qxd4 a6 h4 Bd7/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 cxd4 exd4 a6 a4 b6/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O d5 Nxd4 Be7 c4 O-O cxd5 Nxd5 Nd2 b6 e4 Nb4/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nge7 Be3 Nxd4 Qxd4b5 Qd2/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Bd2 a6 Ne5 Bd6/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 c6 f3 cxd5 cxd5 Bd7/King's Indian/Averbakh system
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nf3 h6 O-O Be7 Re1 O-O h3 a6/Sicilian/Boleslavsky variation
e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Be3 cxd4 cxd4 g6 Nc3 Qa5 Bc4 Bg7 h3 O-O Nf3 a6/Sicilian/Alapin's variation (2.c3)
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Nf6 e5 Nd5 Qb3 Na5 Qb5+/QGA/3.e4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 e4 e5 a4 a6 dxe5 dxe5 b3 Re8/King's Indian/fianchetto without c4
e4 c6 d4 d5 e5 c5 dxc5 Nc6 Nf3 Bg4 Bb5 e6 b4 Ne7 Nbd2 g6 h3 Bxf3 Nxf3 Bg7/Caro-Kann/advance variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Qb6 Nde2 e6 O-O Be7 Bb3 O-O h3 Na5/Sicilian/Sozin, Benko variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Be7 f4 Qc7 O-O b5/Sicilian/Sozin, 7.Be3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 c5 dxc5 Qa5 Bd2 Qxc5 Nf3 Bg4/King's Indian/Averbakh system
c4 c5 Nf3 Nf6 g3 b6 Bg2 Bb7 O-O g6 Nc3 Bg7 d4 cxd4 Nxd4 Bxg2 Kxg2 Qc8 b3 Qb7+ f3 Nc6/English/symmetrical variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 c5 dxc5 Qa5 e5 Rd8 Bd2 Ng4/Gruenfeld/5.Bf4
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 c5 c3 Na6 Bxf6 Qxf6 O-O Qd8 Na3 Rb8 c4 bxc4/Queen's pawn game/
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Bg4 Be3 Qd7 Nbc3 O-O-O Be4 f5/QGA/3.e4
Nf3 f5 g3 Nf6 Bg2 g6 d4 Bg7 O-O O-O c4 d6 Nc3 c6 Qc2 Qc7 e4 fxe4 Nxe4 Nxe4/Dutch/Leningrad, main variation with c6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be6 Bf3 Nbd7 O-O Be7 Re1 O-O/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 Nf3 e6 Bg5 c5 c3 Nc6 e3 Qb6 Qc2 d5 Bd3 Bd7 Nbd2 cxd4 exd4 Rc8 Qb3 Bd6/Queen's pawn/Torre attack
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Nc3 Rc1 Nxc3 Bxc3 Be4/Queen's Indian/Yates variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O d5 Bb4 Bd2 c6 dxe6 dxe6 Qc2 Nbd7/Queen's Indian/anti-Queen's Indian system
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 b6 O-O Bb7 cxd5 Bxd5 Qc2 Be7/Queen's gambit declined/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Be7 Re1 O-O Nxc6 dxc6/Sicilian/Taimanov variation
e4 e6 d4 d5 Nd2 dxe4 Nxe4 Nd7 Nf3 Be7 Bd3 Ngf6 Nxf6+ Bxf6 Qe2 c5 d5 Nb6 Bb5+ Kf8/French/Rubinstein variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Nb3 a6 f4 Nc6 Bf3 Be6/Sicilian/dragon variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 Nc6 a3 d5 Rd1 e5 Bg5 d4/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Qe8 h4 Nc5 Bxf6 Bxf6/King's Indian/Averbakh system
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bxf6 Bxf6 Qb3 Rd1 a5/QGD/Neo-orthodox variation, 7.Bxf6
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Ne5 c5 Bd2 Nc6/Nimzo-Indian/4.e3, main line with ...b6
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8 Nc3 Bd7 h3 Ne7/Ruy Lopez/Berlin defence, open variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Qd2 exd5 Qe3+ Kf8 Qf4 Bf6/Gruenfeld/5.Bg5
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 Bxc4 e6 Nbd2/QGA/Alekhine defence
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 h6 a4 b4 cxb4 cxb4 Nbd2 d5 a5 Be7/Queen's pawn game/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 Ne4/QGD semi-Slav/Stoltz variation
d4 d5 c4 e6 Nf3 Nf6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 Qxc4 Qc2 Bb7 Bg5 Nbd7/Catalan/closed, 5.Nf3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 Qd2 a6/King's Indian/Saemisch, 5...O-O
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 Rd1/QGD/Charousek (Petrosian) variation
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Qc2 O-O Bd3 Nbd7 Nge2 Re8 h3 Nf8/QGD/exchange, positional line
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O b5 Bb3 Bb7 d3 Be7 Nc3 a4 b4 Ne2 d6/Ruy Lopez/Archangelsk (counterthrust) variation
Nf3 d5 b4 Nf6 Bb2 e6 a3 c5 bxc5 Bxc5 e3 O-O/Santasiere's folly/
e4 e6 d4 d5 Nd2 c5 Ngf3 Nc6 Bb5 dxe4 Nxe4 Bd7/French/Tarrasch, open variation
d4 g6 e4 Bg7 Nc3 d6 f4 Nf6 Nf3 O-O Bd3 Nc6 O-O e5 fxe5 dxe5 d5 Nb4 Bc4 Ne8/Pirc/Austrian attack, 6.Bd3
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 e5 b5 Qb3 Nfd7 h4 Nb6/Gruenfeld/Russian, Alekhine (Hungarian) variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc6 Rb8 Bf4 Nd5 Bg5 Be7/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 d4 b5 Bb3 Nxd4 Nxd4 exd4 Bd5 Rb8 Qxd4 c5 Qd3 Ne7/Ruy Lopez/modern Steinitz defence
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Nc3 Nxc3 dxc3 Be7 Qd4 O-O Be3 Nc6 Qf4 Qd7 h3 Qf5/Petrov/Nimzovich attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 Nbd2 Nbd7 Qc2 Re8 e4 dxe4 Nxe4 Nxe4/Neo-Gruenfeld, 6.O-O c6/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 c6 e3 Be6 Ng5 Bg4 Qb3 Qb6 h3 Bd7/Gruenfeld/5.Bf4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 c5 dxc5 Nbd7 e5 Nh5 Be3 Nxe5/Gruenfeld/5.Bf4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 a6 a4 h6 Be3e6 dxe6/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 Rd1 Bd7 Be2 Rc8 O-O Be7/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
c4 c6 Nf3 d5 g3 Nf6 Bg2 Bg4 cxd5 cxd5 Ne5 Bc8 O-O e6 Nc3 Be7 d4 O-O Bf4 Nbd7 Qb3 Qb6 Qxb6 axb6 Nxd7 Bxd7/English/Caro-Kann defensive system
e4 c5 c3 b6 d4 Bb7 Bd3 Nf6 Nd2 cxd4 cxd4 Nc6 Ne2 e5 d5 Bb1 Bc5 O-O a5/Sicilian/Alapin's variation (2.c3)
d4 f5 c4 e6 g3 Nf6 Bg2 c6 Nf3 d5 O-O Bd6 b3 Qe7 Ne5 O-O Qc2 Nbd7 Nd3 Ne4/Dutch defence/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 c5 d5 Qa5 a4 e6 Nd1 Qc7/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qc7 Bxf6 gxf6 f5 Nc6 fxe6 fxe6/Sicilian/Najdorf, 7.f4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 a6 Nd6+ Bxd6 Qxd6 Qf6 Qd2 Nge7 Nc3 d6 Bd3 Be6/Sicilian/Labourdonnais-Loewenthal variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O f4 Qc7 Kh1 b5/Sicilian/Najdorf, Opovcensky variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 f4 e5 Nde2 exf4 Nxf4 Be7 Qd2 O-O/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nf3 Qc7 a4 a5 O-O Be2 Qc6/Sicilian/Najdorf, Byrne (English) attack
c4 e5 Nc3 Nc6 Nf3 Nf6 g3 Bb4 Bg2 O-O O-O e4 Ng5 Bxc3 bxc3 Re8/English/four knights, kingside fianchetto
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Bd6 Nb5 Be6 e3 Nc6/Nimzo-Indian/classical, Noa variation
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 Be2 cxd4 cxd4 Nh6 b3 Nf5 Bb2 Bb4+ Kf1 Be7/French/advance, Paulsen attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Nb3 Nbd7 Qd2 Qc7 O-O-O b5/Sicilian/Najdorf, 7...Qb6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 Nbd7 Be3 b5 a4 Nc6 Qc7 Nxb4 e6/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 d5 Ne5 Ng3 e6 Be2 exd5/King's Indian/Saemisch, 5...O-O
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qb3 b6 Nc3 Nbd7 Rac1/Queen's gambit declined/
e4 e5 Nf3 Nf6 d4 Nxe4 Bd3 d5 Nxe5 Bd6 O-O O-O Nc3 Nxc3 bxc3 Nd7 Re1 Bxe5 dxe5 Nc5/Petrov/modern attack, Symmetrical variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 cxd4 exd4 a6 a3 Bxc3/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qd2 dxc4 Bxc4 c5 O-O cxd4/QGD/Charousek (Petrosian) variation
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Nxc6 Qf6 Qd2 bxc6 Bd3 Ne7 O-O O-O Nc3 d6 e5 Qe6/Scotch game/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc6 Rb8 Bf4 Nd5 Bg5 Qe7/Queen's gambit declined/
e4 e6 d3 d5 Nd2 Nf6 g3 dxe4 dxe4 Bc5 Bg2 Nc6 Ngf3 e5 O-O O-O c3 a5 Qc2 b6/French/King's Indian attack
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 a6 Nge2 Nbd7/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Be3 Rg1 O-O Qh5 g6/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Ne5 c6 Bf4 Nfd7/Queen's Indian/Riumin variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O d6 Nxd4 Qc7 Nd2 d5 c4 e5 Nc2 dxc4 Na3 Bxa3 Qa4+/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 Bd2 Bxc4 c5 dxc5 Bxc5/Nimzo-Indian/4.e3, main line with ...b6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O Nxc6 Bxc6 Re1 Be7/Sicilian/Taimanov variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O Qb6/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3 a6 Ba4 d6 d4 Bd7 dxe5 Nxe5 dxe5 Bg5 Nf6/Ruy Lopez/fianchetto (Smyslov/Barnes) defence
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nb3 Be7 O-O O-O Be3 a5 a4 Be6/Sicilian/Boleslavsky variation, 7.Nb3
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Nd2 Bg7 Nc4 Bg5 Qe7 Qd2 Nbd7/Benoni/Nimzovich (knight's tour) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bf4 Nxc3 bxc3 c5 e3 cxd4/Gruenfeld/5.Bg5
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 cxd4 exd4 a6 Ne5 b5/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 dxc5 Qa5 Bd2 Qxc5 Nf3 Bg4 O-O/King's Indian/Averbakh, 6...c5
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 c4 cxd4 Qxd4 d6 Nc3 Rd1 a6 b3 Nbd7/English/symmetrical, hedgehog, flexible formation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bd3 O-O O-O/Sicilian/Scheveningen, 6.f4
d4 Nf6 Bg5 e6 e4 h6 Bxf6 Qxf6 Nf3 d6/Trompovsky attack (Ruth, Opovcensky opening)/
Nf3 f5 e4 fxe4 Ng5 e5 d3 e3 Bxe3 Nc6 g3 Nf6 Bg2 d5 c4/Reti/Pirc-Lisitsin gambit
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Be7 Qf3 h6 Bh4 g5 fxg5 Nfd7/Sicilian/Najdorf, Goteborg (Argentine) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4Qc7 f4 Qa5+ c3 Ba6/Sicilian/Anderssen variation
d4 f5 g3 Nf6 Bg2 c6 Nf3 d6 O-O g6 c4 Bg7 Nc3 O-O d5 e5 dxe6 Bxe6 b3 Ne4/Dutch/Leningrad, main variation with c6
e4 e5 Nf3 Nc6 Bb5 f5 Nc3 Nf6 exf5 e4 Nh4 d5 d3 Be7 dxe4 dxe4 Qxd8+ Bxd8 Bg5 O-O/Ruy Lopez/Schliemann defence, Berger variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 h4 e5 d5 c6 h5 cxd5 cxd5 Qb6/King's Indian/Averbakh system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 a5 Nbd2 Bf5 Nh4 Nxd2/Neo-Gruenfeld, 6.O-O c6/
d4 Nf6 c4 e5 dxe5 Ng4 Nf3 Bc5 e3 Nc6 a3 a5 b3 O-O Nc3 Re8 Be2 Ncxe5 Nxe5 Nxe5 O-O d6/Budapest/Adler variation
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 Nf3 g6 Nd2 Nbd7 Nc4 Nb6 e4 Bg7 Ne3 O-O/Benoni/Nimzovich (knight's tour) variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nbd7/QGA/classical variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 c5 O-O Nc6 Qa4 cxd4 Nxd4 Qxd4 Bxc6+ Bd7 Bxd7+ Qxd7/Catalan/open, 5.Nf3
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qd1 c5 e3 cxd4 exd4 Ne4 Bd2 Nc6/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 a6 f4 Qd2 O-O O-O-O Qc7/Sicilian/Taimanov variation
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Bg4 Be3 Bxe2 Bxe2 Qd7 Nc3/QGA/3.e4
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 a3 c4 g3 Na5 Nbd2 Bd7/French/advance, Paulsen attack
c4 e5 Nc3 Nc6 Nf3 Nf6 e3 Bb4 Qc2 O-O Nd5 Re8 Qf5 d6 Nxf6+ gxf6 Qh5 d5 a3 Bf8 d4 Be6 Bd3 e4 Bc2 Ne7/English/four knights, Stean variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 cxd5 Ne5 Nc6 Nc3 Nxe5 dxe5 Ng4/Neo-Gruenfeld, 6.O-O, main line/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Qd2 Qxb2 Rb1 Qa3 Be2 Nbd7/Sicilian/Najdorf, Poisoned pawn variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bg5 Bxf6/Queen's Indian/Yates variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 h3 O-O Qd2 Nc6 O-O-O Bd7 g4 Rc8/Sicilian/dragon, 6.Be3
e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 Nc6 h3 Ne4 Bd2 Nxd2 Nxd2 e6 Bb5 Bb4 O-O Bxc3/Scandinavian (centre counter) defence/
d4 Nf6 Nf3 d5 c4 dxc4 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6 Nbd2 Bb7/QGA/classical variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 O-O-O Nb6 Qc5 N8d7/Gruenfeld/Russian, Smyslov variation
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 a3 Bxc3+ bxc3 c5 a4 Qa5 Bd2 Nbc6 Nf3 Bd7 g3 O-O-O/French/Winawer, advance, Smyslov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 Nbd7 Qd2 c5 d5 Qa5/King's Indian/Averbakh system
d4 c5 dxc5 e6 Nc3 Bxc5 Ne4 Nf6 Nxc5 Qa5+ Qd2 Qxc5 Qg5 Qxg5 Bxg5 b6 c4 Bb7 f3 h6/Old Benoni defence/
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc2 Bb7 O-O c5 a4 b4/Queen's gambit declined/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Be7 cxd5 exd5 Ne5 c5/Nimzo-Indian/4.e3, main line with ...b6
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 cxd4 exd4 Nc6 O-O Be7 Be3 O-O Nc3 Na5/QGA/classical variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Bd7 Na3 cxd4 Naxc4 Be7 Qb3 Qc8/Catalan/open, 5.Nf3
d4 d6 c4 g6 Nc3 Bg7 e4 Nd7 Nf3 e5 Be2 Ne7 Be3 O-O Qd2 f5/Modern defence/Averbakh system
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 Nbd7 Bd3 Nf8 Nf3/QGD/exchange, positional line
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Bd3 Bb7 a4 b4 Nbd2 e6 e4 c5 e5 Nd5/QGA/Alekhine defence
c4 c5 Nc3 Nf6 Nf3 d5 cxd5 Nxd5 e4 Nxc3 dxc3 Qxd1+ Kxd1 Nc6/English/symmetrical, three knights system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 f4 e5 Nf3 Qd2 Ng4 f5 g6/Sicilian/Taimanov variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Qb6 Nb3 e6 Bd3 Be7 O-O a6 Kh1 O-O/Sicilian/Richter-Rauzer
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 Nbd7 Bd3 O-O Nge2c6 Ng3 h6 h4 Nb6/QGD/exchange, positional line
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 Nc6 Qd2 Bd7 Bxf6 gxf6 Nf5 Qa5 Be2 Rc8/Sicilian/Najdorf, 6.Bg5
d4 e6 Nf3 f5 g3 Nf6 Bg2 Be7 O-O O-O c4 d5 Nbd2 c6 Ne5 Nd3 Bd6 c5 Bc7/Dutch/stonewall variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 Qc7 Qc2 dxc4/Nimzo-Indian/4.e3, main line with 8...Bxc3
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6 Be3 O-O O-O cxd4/Gruenfeld/exchange, classical variation
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Bd3 Nbd7 Re1 Be7 e4 cxd4 e5 Nd5/QGA/classical, 6...a6
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 Nc3 Bd6 d4 exd4 Qxd4 f6 Be3Ne7 O-O-O Ng6 h4 Qe7/Ruy Lopez/exchange, Keres variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 c6 dxc6Nxc6 e3 e5 d5 Qxg5/Gruenfeld/5.Bg5
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Rb1 Nd7 Bd3 O-O/Gruenfeld/exchange variation
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Qe2 b5 Bd3 exd4 Nc6 a4 bxa4/QGA/classical, 7...b5
e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Bd2 Nxe4 Bxb4 Nxb4 Bxf7+ Kxf7 Qb3+ Kf8/Giuoco Piano/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 a3 e5/QGD semi-Slav/Stoltz variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 Be7 O-O-OO-O f4 Nxd4 Qxd4 a6/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7 defence, 9...Nxd4
e4 g6 d4 Bg7 Nc3 c6 Nf3 d5 h3 Nf6 e5 Ne4 Nxe4 dxe4 Ng5 c5 d5 Bxe5 Nxe4 Nd7/Robatsch defence/
Nf3 Nf6 g3 b5 Bg2 Bb7 O-O e6 d3 d6 e4 Be7 Bd2 O-O/Reti/King's Indian attack, Spassky's variation
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 dxc4 Bg2 Nc6 Qc2 Bxd2+ Bxd2 Nxd4 Qxc4 Nxf3+ Bxf3 O-O/Queen's gambit declined/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g3 g6 Bg2 Bd7 O-O Bg7 Nde2 O-O h3 Na5/Sicilian/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Qb6 Nb3 e6 Qe2 a6 Be3 Qc7 f4 b5/Sicilian/Sozin, Benko variation
d4 f5 Nf3 Nf6 g3 g6 Bg2 Bg7 O-O O-O c4 d6 Nc3 c6 Re1 Nh5 h3 e5 e4 exd4/Dutch/Leningrad, main variation with c6
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Nh6 Nb3 O-O Nbxd4 Nxd4/QGA/3.e4
d4 d5 c4 e6 Nf3 c6 Nc3 dxc4 a4 Bb4 g3 a5 Ne5 Nf6 Bg2 Nd5 Bd2 Nb6 e3 N8d7/QGD/semi-Slav, Noteboom variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 Re1 b6/QGA/classical, 6...a6
d4 Nf6 Bg5 c5 d5 Qb6 Nc3 Qxb2 Bd2 Qb6 e4 e5 f4 d6 fxe5 dxe5/Trompovsky attack (Ruth, Opovcensky opening)/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 Qb3 Qb6 O-O Bf5 h3 Rd8 g4 Be6/King's Indian/fianchetto without c4
d4 Nf6 Nf3 b6 Bg5 Ne4 Bh4 Bb7 Nbd2 g6/Queen's Indian defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nge7 Be3 b5 Nb3 f4 Bd7 Bg2 Nc8/Sicilian/Taimanov variation
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O Qd6 Na3 Be6 Qe2 f6 Rd1 O-O-O d4 Bg4 Be3 Qe6/Ruy Lopez/exchange, Bronstein variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bh4 c5 dxc5 Nc6 e3 g5 Bg3 Ne4/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 Qxd8 Rxd8 Bxc5 Nc6 Nd5 Nd7/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f3 Nbd7 Be3 d5 Nxd5 Nxd5 exd5 Qa5+ Qd2 Qxd5/Sicilian/Najdorf
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Bd3 cxd4 exd4 Be7 Ne5 O-O Be3 Bd7/QGA/classical, 6...a6
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O Nc6 Nxd4 Bc5 Nb3 Be7 c4/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Be2 Be7 Be3 O-O O-O g4 Nfd7/Sicilian/Scheveningen, 6.f4
e4 e6 d4 d5 Nd2 c5 exd5 Qxd5 Ngf3 cxd4 Bc4 Qd6 O-O Nf6 Nb3Nc6 Nbxd4 Nxd4 Qxd4 Qxd4 Nxd4 Bd7/French/Tarrasch, open variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 d6 N1c3 a6 Na3 b5 Nd5 Nge7 c4 Nd4 Bg5 h6/Sicilian/Labourdonnais-Loewenthal (Kalashnikov) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e3 c5 Bxc4 Qa5 O-O cxd4 Nxd4 e5/Gruenfeld/5.Bf4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 cxd5 Ne5 Nc3 Nfd7 Nf3 Nb6/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 cxd4 exd4 b6 Bg5 Bb7/Nimzo-Indian/4.e3, Gligoric system with 7...dc
e4 c5 Nf3 d6 d4 Nf6 Nc3 cxd4 Nxd4 a6 Be2 e5 Nb3 Be7 O-O O-O Qd3 b5 a4 b4/Sicilian/Najdorf, Opovcensky variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O dxc4 Bxc4 b5 Bd3 e4 c5 a4/QGD Slav/4.e3
e4 c5 Nf3 Nc6 d3 g6 g3 Bg7 Bg2 e5 O-O Nge7 c3 O-O Be3 d6 Na3 h6 Qd2 Kh7/Sicilian defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 Nb3 g4 b5 Bd3 Nc6/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Be7 Re1 Nxd4 Qxd4 Bc5/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 f3d6 b4 Na4 Qb3 Bd7/Nimzo-Indian/classical, 4...c5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 Qb3 dxc4 Qxc4 Nbd7 O-O Nb6 Qd3 Nfd5/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 O-O Nxd4 Qxd4 O-O f4 b6/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 Nc6 c3 Nf6 e5 Nd5 d4 cxd4 cxd4 d6 Bc4 Nb6 Bb5 Nc3 Bg4 h3 Bxf3/Sicilian defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 O-O Nxd4 Qxd4 Nc6 Qd3 Qc7 Bg5/Sicilian/Taimanov variation
c4 c6 Nf3 Nf6 g3 d5 Bg2 Bf5 cxd5 cxd5 Qb3 Qb6 Qxb6 axb6 Nc3 Nc6 d3 e6 Nb5 Bb4+ Bd2 Ke7 Nfd4 Bxd2+ Kxd2 Bg6/English/Caro-Kann defensive system
e4 Nf6 e5 Nd5 d4 d6 Nf3 g6 Bc4 Nb6 Bb3 Bg7 a4 a5 Qe2 Nc6 O-O dxe5 dxe5 Nd4/Alekhine's defence/modern, Keres variation
e4 e5 Nf3 Nf6 Nc3 Nc6 Bb5 Bb4 O-O O-O d3 d6 Ne2 Ne7 Ng3 Ba4 Ng6 c3 Ba5/Four knights/symmetrical, Maroczy system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O h5 h3 b5 Nxc6 Qxc6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4 Bxe4 Ne1 d5 cxd5 Bxg2/Queen's Indian/old main line, 7.Nc3
e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3 Bg4 Be2 e6 h3 Bh5 Na3 Be3 cxd4 Nb5 Rc8/Sicilian/Alapin's variation (2.c3)
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Be7 c5 b6 cxb6 Qxb6 Bb5+ Bd7 Bxd7+ Nbxd7/Caro-Kann/Panov-Botvinnik attack, 5...e6
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Bc5 Qd3 O-O/Ruy Lopez/open, Motzko attack
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 e6 Qd2 exd5 exd5 Re8 Nf3 Qb6/King's Indian/Averbakh, main line
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O b5 Bb3 Bb7 Re1 Bc5 c3 d6 d4 Bb6 Qd3 h6/Ruy Lopez/Archangelsk (counterthrust) variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 cxd4 Nxd4 Qb6 Nb5 d5 O-O Bd7 Be3 d4 Bxd4 Nxd4/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Nc6 Rg1 h5 gxh5 Nxh5 Bg5 Nf6/Sicilian/Scheveningen, Keres attack
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 Bf4 Qa5 Bd2/QGA/Linares variation
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 b6 cxd5 exd5/QGD/4.Bg5 Be7
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 d6 O-O O-O Nc3 Nbd7 Rfd1 Ne4/Queen's Indian/Capablanca variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 f4 b5 Be2/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 Nf4 Be2 e5 dxe5 dxe5/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 g3 Nc6 Nde2 b6 Bg2 Ba6 O-O Rc8 Re1 Bg7/Sicilian/dragon variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 e3 O-O b4 c6/Gruenfeld/5.Bg5
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 Nbd7 Nbd2/Queen's gambit declined/
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 e4 Ng4 Bg5 Nc6/QGA/classical variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f4 exf4 Bxf4 Nc6 Qe2 g6/Sicilian/Najdorf, Byrne (English) attack
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4 cxd5 Nxd5 Qc2 Nd7 a3 Ba5 Bd3 N7f6/Caro-Kann/Panov-Botvinnik attack, 5...e6
d4 d5 c4 e6 Nf3 Nf6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 Qxc4 Qc2 Bb7 Bd2 Nc6/Catalan/closed, 5.Nf3
d4 d5 c4 e6 Nf3 c6 e3 Bd6 Nc3 Nf6 Be2/Queen's gambit declined/
e4 c5 Nf3 Nc6 Nc3 d6 d4 cxd4 Nxd4 Nf6 Bc4 Qb6 Nxc6 bxc6 O-O e6 Qe2 Be7 e5 dxe5/Sicilian/Sozin, Benko variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Be3 h4 O-O Qd2 Nde5/Sicilian/Scheveningen, Keres attack
e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5 Ne5 e6 g4 Bg6 h4 Nbd7 Nxd7 Nxd7/Scandinavian (centre counter) defence/
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 O-O Rc1 Nd7 Bd3 Qa5/Gruenfeld/exchange variation
e4 c5 Nf3 Nc6 Bb5 d6 O-O Bd7 Re1 Nf6 c3 a6 Bf1 Bg4 d3 e6 Nbd2 d5 exd5 Qxd5/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 Bd3 b5 O-O Bb7 Qe2 Nf6 Kh1 Bb4/Sicilian/Taimanov variation
e4 e6 d4 d5 Nc3 Bb4 e5 Qd7 a3 Bxc3+ bxc3 b6 Qg4 f5 Qg3 Nh3 Nc6 Nf4 O-O-O/French/Winawer, Petrosian variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Na5 f4 Nxb3/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Nc6 Nxc6 bxc6 e5 h6 Bxf6 gxf6/Sicilian/Najdorf, 7.f4
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O Bd6 Nc3 O-O e4 Bxc4 b5/QGD Slav/4.e3
d4 Nf6 Nf3 d5 c4 dxc4 e3 e6 Bxc4 c5 Qe2 cxd4 exd4 Nc6 O-O Nxd4 Nxd4 Qxd4 Rd1 Qb6 Bb5+/QGA/classical variation
c4 e5 Nc3 Nc6 Nf3 Nf6 e3 Bb4 Qc2 Bxc3 Qxc3 Qe7 a3 a5 b4 d6*/English/four knights, Romanishin variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 Nc6 Nge2 Re8 d5 Ne5 Ng3 c6/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f3 e5 Nb3 Be7 Be3 Be6 Qe2 O-O O-O-O Na5/Sicilian/
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Bg5 Be7 Qc2 g6 e3 Bd3 Bxd3 Qxd3 Nbd7/Queen's gambit declined/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 Nbd7 Qe2 b6 d5 Bxc3/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 a6 Rd1 c5/QGD semi-Slav/Stoltz variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Qb6 Nxc6 bxc6 O-O e6 Bd3 Be7 Na4 Qc7/Sicilian/Sozin, Benko variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 h6 Bf4 e6 dxe6 Bxe6 Bxd6 Re8/King's Indian/Averbakh, 6...c5
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 cxd4 Nxd4 Bc5 Nb3 Bb4+/Queen's pawn game/
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Nxd7 O-O Ngf6 Qe2 e6 b3 Be7 Bb2 O-O d4 cxd4 Nxd4 a6/Sicilian/Canal-Sokolsky attack, 3...Bd7
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Nge2 c5 d5 b5 cxb5 Qa5 Ng3 axb5/King's Indian/Saemisch, 5...O-O
d4 Nf6 Nf3 b6 g3 Bb7 Bg2 c5 c3 e6 O-O Be7 Nbd2 O-O/Queen's Indian/Marienbad system
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 Be2 Qb3 Bb7 e5 Nd5/Gruenfeld/Russian, Alekhine (Hungarian) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 Bf4 Ng6 Bg3 Be7 Qd2/Sicilian/Taimanov variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Ne7 Bxc4 O-O O-O Nbc6 Be3 Nxd4 Bxd4 Nc6/QGA/3.e4
e4 c5 Nf3 Nc6 Bb5 e6 O-O Nge7 Re1 a6 Bf1 d5 exd5 Nxd5 d4 Nf6 Be3 cxd4 Nxd4 Nxd4/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 a3 Bxc3+ bxc3 Ba6 Ne5 Nfd7 Nxd7 Qxd7/Nimzo-Indian/4.e3, main line with ...b6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O Ne5 h3 Bc5 Kh1 d6/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Qd2 exd5 Qe3+ Kf8 g3/Gruenfeld/5.Bg5
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 O-O-O e5/Gruenfeld/Russian, Smyslov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 b5 Nxc6 Qxc6 O-O Bb7 Re1 Nf6/Sicilian/Taimanov variation
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6 Rd1 Qc7/QGA/classical variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O Bd6 Nc3 O-O e4 Bxc4 e5 Bg5 h6/QGD Slav/4.e3
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 a6 O-O Nc6 Nc3 Rb8 e4 Be7 d5 exd5 exd5 Nb4/Catalan/open, 5.Nf3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 d5 Ne5 Ng3 h5 Be2 h4/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Nf3 a6 Bd3 b5 O-O b4 Na4 Be7/Sicilian/Scheveningen, 6.f4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d6 O-O Bf5 Ne1 e5 d5 cxd5 Nxd5 Nxd5/King's Indian/fianchetto, Larsen system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 b3 O-O c4 Ne4 Bb2 a5 Nfd2/King's Indian/fianchetto without c4
Nf3 f5 g3 Nf6 Bg2 g6 O-O Bg7 d4 O-O c4 c6 Nc3 d6 Qc2 a5 b3 Na6 Bb2 Qc7/Dutch/Leningrad, main variation with c6
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 Nf3 Nd7 Bd3 e6 O-O Ngf6 Re1 Be7 c4 Qc7/Caro-Kann/classical variation
d4 d5 c4 dxc4 e4 c5 d5 e6 Nc3 exd5 Nxd5 Ne7 Bxc4 Nxd5 Bxd5Be7 Nf3 O-O O-O Qb6/QGA/3.e4
d4 Nf6 Nf3 e6 g3 b5 Qd3 a6 e4 Bb7 Nbd2 c5 Bg2 Nc6 c3 cxd4 Nxd4 Qc7 O-O Nxd4/Queen's pawn game/
d4 Nf6 c4 d6 Nc3 e5 Nf3 Nbd7 e4 Be7 Be2 O-O O-O Re8 Re1 Bf1 Bf8/Old Indian/main line
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 a5 a4 Na6 Bb2 c6 Nbd2 Bd7 e4 Rb8/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Bd7 O-O g6 Nxc6 bxc6 f4 Bg4 Qd3 Bg7/Sicilian/Sozin, not Scheveningen
e4 e5 Bc4 Nf6 d3 Nc6 Nf3 Be7 O-O O-O Bb3 d6 c3 h6 Re1 Nh7 Nbd2 Ng5 Nxg5 Bxg5/Two knights defence (Modern bishop's opening)/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 c5 e5 dxe5 dxe5 Qxd1+ Rxd1 Ng4/King's Indian/Averbakh system
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Be7 Nbd2 O-O/Ruy Lopez/open, 8...Be6
c4 e6 Nf3 d5 g3 Nf6 Bg2 dxc4 Na3 Bxa3 bxa3 O-O Qc2 Nd5 Qxc4 b6 Bb2 Bb7 O-O Nd7/English/Neo-Catalan accepted
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Nge7 Nb3 O-O Nfxd4 Nxd4/QGA/3.e4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 Bd7 O-O Nf6 Re1 Be7 d3 O-O Nbd2 b5 Bc2 Re8/Ruy Lopez/modern Steinitz defence
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 Re8 Nbd2/Ruy Lopez/closed, anti-Marshall 8.a4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 e5 Nb3 Be6 c4 Be7 Be3 Nc3 Nbd7 Qd2 Rc8/Sicilian/Prins (Moscow) variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 f5 Qc2 Nxd2 Qxd2 Nc6/Queen's Indian/old main line, 7.Nc3
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 c5 Bd2 Bxc3 Bxc3 cxd4 Bxd4 Nc6 Bxf6 gxf6/Nimzo-Indian/classical, Noa variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Nd5 Bxb4 Nxb4 a3 b5 Qxb5 Nc2+/Catalan/open, 5.Nf3
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Nf6 e5 Nd5 Nb3 O-O/QGA/3.e4
b3 e5 Bb2 Nc6 c4 Nf6 e3 d5 cxd5 Nxd5 a3 Bd6 Qc2 O-O Nf3 Qe7 Nc3 Nxc3 Qxc3 f5 Bb5 e4/Nimzovich-Larsen attack/modern variation
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8 h3 Bd7 Rd1 Kc8/Ruy Lopez/Berlin defence, open variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 Be7 O-O-OO-O f4 h6 Bh4 Bd7/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7 defence, 9.f4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Nc5 f3 a5 O-O-O Bd7/King's Indian/Averbakh system
c4 c5 Nf3 Nf6 g3 b6 Bg2 Bb7 O-O e6 b3 Be7 Bb2 O-O Nc3 d5 Ne5 Qc7/English/symmetrical variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Bg5 Na6 Nbd2 Be7 c3 e3 cxd4/Queen's pawn game/
c4 c5 Nc3 Nf6 Nf3 d5 cxd5 Nxd5 e4 Nb4 Bc4 Be6 Bxe6 Nd3+ Kf1 fxe6/English/symmetrical, three knights system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O Nc6 Kh1 O-O f4 Nxd4/Sicilian/Scheveningen, 6.Be2
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4f5 exf6 Nxf6 Nd6+ Bxd6/Sicilian/Anderssen variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be2 a6 Be3 b5 Nxc6 dxc6 f4 Bb7 O-O c5/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 e5 d5 c6 Qd2 h5 h3 a6/King's Indian/Averbakh system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 d5 Ne5 Ng3 h5 Be2 e6/King's Indian/Saemisch, 5...O-O
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 Nc6 O-O Bc5 Nb3 Be7 e4 O-O Nc3 a6 Be3 Qc7/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O Nc6 Kh1 a6 a4 O-O f4 Qc7/Sicilian/Scheveningen, 6.Be2
b4 d5 Bb2 Nf6 e3 e6 b5 c5 Nf3 Bd6 c4 Nbd7 Be2 O-O O-O b6 a4 Bb7/Polish (Sokolsky) opening/
e4 c5 Nf3 d6 Bb5+ Nd7 c3 Nf6 Qe2 a6 Ba4 e5 O-O Be7 d4 b5 Bc2 O-O dxe5 dxe5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 e5 Nf3 Nf6 Nxe5 d6 Nc4 Nxe4 d4 d5 Ne3 g6 Nd2 Bg7 c3 Nxe4 dxe4 Bc4 Nd7/Petrov/Paulsen attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Na3 c3 bxc3 O-O O-O e3 Nc6 Qe2 Qa5/Neo-Gruenfeld, 5.Nf3/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O Bd7 Nxc6 Bxc6 Qe1 Qa5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
d4 d6 c4 g6 Nc3 Bg7 Nf3 Nd7 g3 e5 Bg2 Nh6 O-O O-O e4 c6 h3 f5 dxe5 dxe5 exf5 gxf5/Modern defence/
c4 c5 Nf3 Nf6 g3 b6 Bg2 Bb7 O-O g6 b3 Bg7 Bb2 O-O Nc3 Na6 d4 d5 dxc5 Nxc5 Nxd5 Nxd5 Bxg7 Kxg7 cxd5 Qxd5 Qxd5 Bxd5/English/symmetrical variation
e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 g6 Bf4 Nf6 Nf3 Bf5 Bxf5 gxf5 O-O e6 Nbd2 Bg7/Caro-Kann/exchange variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 Qc2 b6 Nc3 Bb7 O-O b5/Queen's gambit declined/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 a5 Nbd2 Bf5 Re1 Nxd2/Neo-Gruenfeld, 6.O-O c6/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Bd7 f4 Nxd4/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e5 Nde2 Be6 Bg2 Be7 O-O b5 h3 b4/Sicilian/Najdorf, Zagreb (fianchetto) variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 b3 O-O Bb2 Bf5 c4 a5 Nc3 Ne4 Rc1 Nxc3/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Kh1 Qc7 Qe1 Re8/Sicilian/Scheveningen, 6.Be2
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 c5 dxc5 Qa5 cxd5 Nxd5 Qxd5Bxc3+ Bd2 Be6 Qxb7 Bxd2+/Gruenfeld/5.Bf4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 f3 Nbd7 g4 Be7 Qd2 Rc8/Sicilian/Najdorf, Byrne (English) attack
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc6 Rb8 Bf4 Nd5 Bd2 Bb7/Queen's pawn game/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 Nxd5 Be6 Ne2 Bxd5/King's Indian/Saemisch, 5...O-O
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Ng4 f4 Nxe5 dxe5 e6/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bc1 Nc6 O-O f5/King's Indian/Gligoric-Taimanov system
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Bg5 Be7 Qc2 g6 e3 Bd3 Bxd3 Qxd3 O-O/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 Nc6 Qd2 Bd7 O-O-O h5 Bc4 Ne5/Sicilian/dragon, Yugoslav attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Nc6 Nc3 e6 Bf4 Bd7/Neo-Gruenfeld, 6.O-O, main line/
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 Nf3 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc5 Nc6 O-O-O/QGD/4.Bg5 Be7
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 h4 e5 d5 c6 h5 cxd5 cxd5 Nc5/King's Indian/Averbakh system
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Bd6 O-O O-O Qxc4 e5 dxe5 Nxe5/Catalan/open, 5.Nf3
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 Bd6 Nf3 O-O g3 Bc7 Bg2 O-O a6 a4 Re8/Benoni defence/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 c5 dxc5 Qa5 cxd5 Nxd5 Qxd5Bxc3+ Bd2 Be6 Bxc3 Qxc3+/Gruenfeld/5.Bf4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Nxc6 bxc6 Bd3 d5 O-O Nf6 Re1 Bb7 Bf4 Be7/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 a6 O-O Be7/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 a5 c4/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 c6 dxc6Nxc6 d5/Gruenfeld/5.Bg5
d3 d5 Nd2 e5 g3 Nf6 Bg2 Nc6 c3 a5 Ngf3 Be7 O-O O-O Qc2 b6 b3 Bb7/Mieses opening/
e4 d6 d4 g6 Nc3 Bg7 f4 Nf6 Nf3 O-O Bd3 Bg4 h3 Bxf3 Qxf3 Nc6 Be3 Nd7 Qf2 e5/Pirc/Austrian attack, 6.Bd3
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 O-O d5 cxd5 Nxd5 Nc3 Nb6 e3 a5 b3 Na6/Neo-Gruenfeld, 6.O-O c6/
e4 c5 Nf3 d6 Bb5+ Nd7 d4 Nf6 Nc3 cxd4 Qxd4 e5 Qd3 h6 Be3 Be7 O-O a6 Bc4 b5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O Nc6 Nb3 O-O Bg5 Be6 Kh1 Nd7/Sicilian/dragon variation
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 e3 d6 Nge2 Nge7 O-O O-O d3 Be6*/English/closed system
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 Bf4 Ba6 e5 b4 exf6 bxc3 bxc3 gxf6/QGA/Linares variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O Be3 a6 a4 Nc6 f4 Re8/Sicilian/Scheveningen, 6.Be2
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 Be2 Bh4 Be7 O-O O-O/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 d5 c4 e6 Nc3 c6 Nf3 dxc4 Bg5 Be7 Bxe7 Nxe7 e3 b5 a4 Be2 Nxc3 bxc3 Nd7/QGD/semi-Slav, Noteboom variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 Qxd8 Rxd8 Bxc5 Nc6 Ba3 e6/King's Indian/Saemisch, 5...O-O
Nf3 d5 c4 dxc4 Na3 c5 Nxc4 f6 b3 e5 Bb2 Nc6 g3 Nge7 Bg2 Nd5 O-O Be7/Reti accepted/
e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O Qd6 d3 f6 Be3 Bg4 Nbd2 O-O-O Rb1 Ne7 b4 g5/Ruy Lopez/exchange, Bronstein variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Be3 Rg1 O-O Rg3 d5/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bxf6 Qxf6 e3 O-O Nf3 Bf5 Bd3 Bxd3/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 b5 Bf4 Ba6 e5 b4 e6/QGA/Linares variation
Nf3 e6 g3 f5 Bg2 Nf6 d4 Be7 O-O O-O c4 d5 b3 c6 Ba3 Nbd7 Bxe7 Qxe7 Nbd2 b6/Dutch/stonewall with Ba3
Nf3 f5 d4 Nf6 g3 e6 Bg2 Be7 O-O O-O c4 Qe8 Nc3 d6 Qc2 Qh5 b3 Nc6 Ba3 Bd7/Dutch/Ilyin-Genevsky variation with Qc2
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Nb4 Be4 f5 exf6 exf6 a3 N4d5 Qh5+/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 f4 Nxd4 Qxd4b5 O-O/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 c5 d5 Qa5 a4 e6 dxe6 Bxe6/King's Indian/Saemisch, 5...O-O
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 Nc3 dxc4 Bxc4 b5 Bd3 e4 c5 e5 cxd4/QGD semi-Slav/Meran, old main line
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Nbd7 g4 g5 hxg5 Bxg5 Be7/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 a6 a4 Qa5/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg7 h3 Nf6 Nc3 Nd7 Be3 e5 Qd2 Qe7 Bh6 O-O/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 a5 Nbd2 a4 Nxe4 dxe4/Neo-Gruenfeld, 6.O-O c6/
e4 Nf6 Nc3 d5 e5 Ne4 Nce2 d4 c3 Nc6 Nxd4 Nxd4 Qa4+ c6 Qxd4Qxd4 cxd4 Ng5 Bc4 Bf5/Alekhine's defence/Scandinavian variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be7 f3 Qd2 Qc7 g4 O-O/Sicilian/Najdorf, Byrne (English) attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 Be7 Qd2 O-O O-O-O Bd7 f4 Nxd4/Sicilian/Taimanov variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Nf6 e5 Nd5 Qb3 Na5 Qa4+/QGA/3.e4
e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 Re1 e5 c3 Nge7 d4 cxd4 cxd4 exd4 Bf4 a6 Bc4 d6/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
c4 e6 Nf3 d5 g3 Nf6 Bg2 Be7 b3 b6 Bb2 Bb7 O-O O-O e3 c5 Nc3 dxc4 bxc4 Nc6 Qe2 Rc8/English/Neo-Catalan
Nf3 g6 d4 Bg7 e4 d6 c3 Nf6 Nbd2 O-O Be2 c5 dxc5 dxc5 O-O Nc6 Qc2 Qc7 Re1 b6/Robatsch defence/Geller's system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O h5 h3 Bd6 Qd2 Nxd4/Sicilian/Taimanov variation
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Nf3 Ngf6 Nc3 e6 Bd3 Be7 O-O O-O Qe2 c5 Rd1 cxd4/Caro-Kann/Steinitz variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 Nf6 O-O Be7 Kh1 O-O f4 Bd7 Nb3 Rc8/Sicilian/modern Scheveningen
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 c6 d5 Na6 O-O Ng4 Bg5 f6/King's Indian/Gligoric-Taimanov system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O Re1 Qc7 a4 Be7/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 f5 b3 Bf6/Queen's Indian/old main line, 9.Qxc3
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8 Nc3 Ne7 Ne4 h6/Ruy Lopez/Berlin defence, open variation
e4 e6 d4 d5 Nd2 c5 exd5 Qxd5 Ngf3 cxd4 Bc4 Qd6 O-O Nf6 Nb3Nc6 Nbxd4 Nxd4 Nxd4 a6 Bb3 Qc7/French/Tarrasch, open variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Nbd7 Nc3 e6 f4 a6/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Nd2 Bg7 Nc4 Bg5 h6 Bh4 Na6/Benoni/Nimzovich (knight's tour) variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Re8 Be3 d6/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 Nc6 g3 Bb4 Bg2 O-O O-O Qe7 Nc2 Bxc3 bxc3 Rd8/English/symmetrical variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 cxd4 cxd4 Be7 Bg5 O-O a4 bxa4 Qxa4 h6/Queen's pawn game/
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Nc3 c5/Queen's pawn game/
e4 c5 d3 g6 g3 Bg7 Bg2 Nc6 f4 e6 Nf3 Nge7 O-O O-O c3 b6 Na3 d5 e5 Qd7/Sicilian defence/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3d5 cxd5 exd5 O-O Na6/Queen's Indian/Capablanca variation
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 O-O Rc1 b6 cxd5 Nf3 Bb7 Be2 Nbd7/QGD/4.Bg5 Be7
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 Nc6 Qd2 O-O O-O-O d5 Qe1 e5/Sicilian/dragon, Yugoslav attack, Rauser variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 Nbd7 cxd5 exd5 Bd3/Queen's Indian/Petrosian system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 Nc6 Nge2 Rb8 h4/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bf4 Bg7 Qa4+ Bd7 Qb3 Qc7 h3 O-O/Benoni defence/
d4 Nf6 c4 e6 Nf3 c5 d5 d6 Nc3 exd5 cxd5 g6 Bf4 a6 a4 Bg7 h3 O-O e3 Ne8/Benoni defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5 exd5 exd5 Bb5/Sicilian/Anderssen variation
e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 Re1 Nd6 Nxe5 Be7 Bf1 O-O d4Nf5 c3 Nxe5 Rxe5 d6/Ruy Lopez/Berlin defence, open variation
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 h3 Bg7 Bf4 a6 a4 O-O e3 Nh5/Benoni defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 b5 Qe1 Nxd4/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 dxc4 Qxc4 Be7 e3/Queen's gambit declined/
e4 e5 Nf3 Nf6 Nc3 Nc6 Bb5 Bb4 O-O O-O d3 Bxc3 bxc3 d6 h3 Ne7 Re1 c6 Bc4 Ng6/Four knights/
d4 Nf6 Nf3 g6 Nc3 Bg7 e4 d6 Be2 O-O O-O c6 Re1 Qc7 e5 Nxe5 Nbd7 Bf4 Nxe5/Pirc/classical system, 5.Be2
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nge7 Nb3 Ng6 Bg2 Rb8 f4 Be7 Be3 f6/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bf4 Nxc3 bxc3 dxc4 e3 Be6 Qb1 b6 Ng5 Bd5/Gruenfeld/5.Bg5
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 O-O d5 c4 Be7 dxc5 Bxc5 a3 a5 cxd5/Queen's pawn game/
e4 c5 Nf3 g6 d4 cxd4 Nxd4 Bg7 Nc3 Nc6 Be3 Nf6 Be2 d6 O-O O-O f4 Bd7 Kh1 Nxd4/Sicilian/dragon, classical, 8.O-O
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 Nc6 O-O Qb6 Nb3 d5 Be3 Qd8 c4 dxc4 Bxc6+ bxc6 Qxd8+/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 f3d6 e4 O-O Be3 Qe7/Nimzo-Indian/classical, 4...c5
e4 g6 d4 Bg7 Nc3 d6 Nf3 Nf6 h3 O-O Be3 c6 a4 Nbd7 a5 e5 dxe5 dxe5 Qd6 Re8/Pirc/classical, h3 system
d4 Nf6 Nf3 e6 g3 c5 Bg2 d5 c4 cxd4 Nxd4 e5 Nb3 d4 O-O/Queen's pawn game/
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Bg5 Na6 Nbd2 Be7 c3 Ne5 Bxg2 Kxg2 Qc7/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qb3 c5 a3 Ba5 Qc4 O-O b4 cxb4/Nimzo-Indian/classical, Noa variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Ne7 Bxc4 O-O Bf4 Ng6 Bg3 Nd7 O-O Nde5/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 O-O Be7 a4 Be3 O-O Kh1 Qc7/Sicilian/Scheveningen (Paulsen), classical variation
e4 e6 d4 d5 Nd2 a6 e5 c5 c3 Nc6 Ndf3 cxd4 cxd4 Nge7 Bd3 Nf5 Ne2 Be7 a3 Bd7/French/Tarrasch
d4 d6 c4 g6 Nc3 Bg7 Nf3 e5 dxe5 dxe5 Qxd8+ Kxd8/Modern defence/
d4 f5 c4 g6 Nc3 Nf6 g3 Bg7 Bg2 O-O Nf3 d6 O-O Qe8 d5 Na6 Be3 Bd7 Qd2 Ng4/Dutch defence/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 e5 f4 f6 exf6 Rxf6/King's Indian/Saemisch, 5...O-O
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 O-O Rc1 c5 dxc5 Qc2 Nd5 Bxe7 Qxe7/QGD/4.Bg5 Be7
e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 c3 Nf6 Re1 O-O e5 Nd5 d4 cxd4 Nc7 Nc3 Nxb5/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 Qc2 b6 dxc5 Bxc5 Nc3 Bb7/Queen's pawn game/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nc6 d5 Nb4 c4 Bf5 Na3 c6 Nd4 Bd7/King's Indian/fianchetto without c4
d4 f5 Nf3 Nf6 c4 e6 g3 Be7 Bg2 O-O d5 Ne4 Nbd2 Nxd2 Bxd2 Bf6 Qc2 d6 dxe6 Bxe6/Dutch defence/
d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bg5 h6 Bxf6 Bxf6 e3 O-O Qd2 e4 Re8 O-O-O Nd7/QGD/4.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O a4 Nxd4 Qxd4 Qc7/Sicilian/Taimanov variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qc2 Bb7 Bg5 Nbd7 Bg2 Qb6 O-O c5/Queen's gambit declined/
d4 Nf6 Nf3 e6 Bg5 c5 c3 h6 Bxf6 Qxf6 e4 Nc6 d5 Ne5 Be2 Nxf3+ Bxf3 e5 a4 g6/Queen's pawn/Torre attack
e4 c5 Nc3 e6 Nge2 Nf6 g3 Be7 Bg2 O-O O-O Nc6 d3 Rb8 a4 a6 h3 b5 axb5 axb5/Sicilian/closed
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6 O-O-O d5 h4 dxe4/Sicilian/dragon, Yugoslav attack, Rauser variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 b3 Ne4 Bb2 a5 Nbd2 Nxd2 Nxd2 Na6/Neo-Gruenfeld, 6.O-O c6/
d4 Nf6 c4 d6 Nc3 e5 Nf3 Nbd7 Bg5 Be7 e3 O-O/Old Indian/Ukrainian variation, 4.Nf3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Qe2 Qc7 O-O-O Be7 Bb3 Na5/Sicilian/Sozin, 7.Be3
d4 Nf6 Nf3 e6 Bg5 c5 c3 cxd4 cxd4 Qb6 Qc1 Nc6 Bxf6 gxf6 e3d5 Nc3 Bd7 Be2 Rc8/Queen's pawn/Torre attack
d4 f5 Nf3 Nf6 c4 g6 g3 Bg7 Bg2 O-O b3 d6 Bb2 c6 O-O Na6 Nc3 Qc7 Rc1 e5/Dutch/Leningrad, main variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 Bd2 c6 e3 Nbd7 Bd3 Nb6/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 g6 d4 Bg7 dxc5 Qa5+ Bd2 Qxc5 Bc3 Nf6 Bd3 Nc6 O-OO-O Nbd2 d6 Nb3 Qb6/Sicilian/Hungarian variation
d4 g6 e4 Bg7 c3 d6 Bg5 Nf6 Nd2 O-O Ngf3 Nbd7 Bc4 e5 O-O Bh4 c6 dxe5 dxe5/Robatsch (modern) defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 g6 Bg2 Bg7 O-O h3 Nbd7 Kh2 Nc5/Sicilian/Najdorf, Zagreb (fianchetto) variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 dxc5 Qa5 Bd2 Qxc5 Nf3 Bg4 Be3 Qa5/King's Indian/Averbakh, 6...c5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 e5 dxe5 Nfd7 Bb2 dxe5 e4 Nc6 Nc3 b6/King's Indian/fianchetto without c4
c4 c6 Nf3 d5 g3 Nf6 Bg2 Bf5 cxd5 cxd5 Qb3 Qc8 Nc3 e6 d3 Nc6 Bf4 Be7 O-O O-O/English/Caro-Kann defensive system
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 e3 Nc6 Nf3 d5 a3 Qa5 O-O-O Bd7/Nimzo-Indian/classical, Pirc variation
c4 e6 Nf3 d5 g3 Nf6 Bg2 Be7 O-O O-O b3 b6 Bb2 Bb7 e3 c5 Qe2 Nc6 Rd1 Qc7 Nc3 Rad8 cxd5 exd5 d4 Rfe8/English/Neo-Catalan declined
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Nd2 Bg7 Nc4 Bg5 h6 Bf4 Nbd7/Benoni/Nimzovich (knight's tour) variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 c6 O-O exd4 Bxd4 Qe7/King's Indian/Gligoric-Taimanov system
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O b5 Bd3 Nc6 a3 Bb7/QGA/classical variation
d4 f5 c4 Nf6 Nc3 e6 e3 Bb4 Bd3 Bxc3+ bxc3 O-O Ne2 b6 f3 Nc6 O-O Bb7 e4 fxe4/Dutch with c4 & Nc3/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 a3 Nc6 Rd1 Rc8/Nimzo-Indian/classical, Pirc variation
e4 Nf6 e5 Nd5 d4 d6 Nf3 g6 Bc4 c6 O-O Bg7 exd6 Qxd6 Bg5 Bg4 Nbd2 Nd7 Re1 e6/Alekhine's defence/modern, fianchetto variation
e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 O-O Nd4 Nxd4 Bxd4 c3 Bb6 Kh1 c6 Ba4 d5 Qe2 dxe4/Ruy Lopez/Berlin defence
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 c6 h4 cxd5 cxd5 Qa5/King's Indian/Averbakh system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Qc7 O-O Nf3/Sicilian/Scheveningen, 6.f4
c4 f5 d4 Nf6 g3 e6 Bg2 Be7 Nf3 d5 O-O c6 b3 O-O Ba3 Bxa3 Nxa3 Bd7 Nc2 Be8/Dutch/stonewall with Ba3
e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Nc3 Nxc3 dxc3 Be7 Bf4 O-O Qd2 Nd7 O-O-O Nc5 Be3 c6/Petrov/Nimzovich attack
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Rc1 Re8 Re1 d5/Queen's Indian/Riumin variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nc3 Be7/Catalan/open, 5.Nf3
d4 Nf6 Nf3 e6 g3 b5 Qd3 a6 e4 Bb7 e5 Nd5 Bg2 c5/Queen's pawn game/
Nf3 g6 e4 Bg7 d4 d6 c3 Nf6 Nbd2 O-O Be2 Nc6 O-O e5 dxe5 dxe5 Qc2 Nh5 Rd1 Nf4/Robatsch defence/Geller's system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Bc4 Nc6 Bb3 Bd7 h4 Rc8/Sicilian/dragon, Yugoslav attack, 7...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Nb3 Nbd7 Be2 Be7 Qd2 Qc7/Sicilian/Najdorf, 7...Qb6
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nc6 d5 Nb4 e4 e5 Bd2 Na6 c4 Nc5/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bf4 a6 e4 b5 Qe2 Be7 O-O-O Nh5/Benoni defence/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 Bxb4 cxb4 O-O O-O Nbd2 d6 Re1 Nbd7/Queen's Indian/Capablanca variation
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Bd7 dxc5 Bxc5 b4 Bb6 b5 Na5 Bd3 Nc4 a4 Qc7 Qe2 a6 bxa6 Rxa6 O-O Ne7/French/advance, Euwe variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Be2 Be7 O-O Kh1 O-O Qe1 b5/Sicilian/Scheveningen, 6.f4
e4 c5 c3 Nf6 e5 Nd5 Nf3 Nc6 Na3 g6 g3 Bg7 Bg2 O-O O-O d6 exd6 Qxd6 d4 cxd4/Sicilian/2.c3, Heidenfeld variation
e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Qxd4 e6 Nf3 Nc6 Qe4 f5 exf6 Nxf6 Qc2 d5 Bg5 e5/Sicilian/Alapin's variation (2.c3)
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Qd2 Be7 f3 O-O g4 d5 g5 Nh5/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bc4 e6 O-O Nc6 a3 Kh1 O-O Ba2 d5/Sicilian/Najdorf, Lipnitzky attack
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Na3 a6 c4 cxd4/Queen's pawn game/
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Nc5 Nd7 Bd3 Bxd3 Nxd3 e6 Qe2Ngf6 Nf3 Bd6 O-O O-O/Caro-Kann/classical variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 cxd4 exd4 Bb4+ Nc3 O-O O-O Nbd7/QGA/classical variation
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Qc2 Na6 Bg5 Be7 e3 Nb4 Qb1/Queen's gambit declined/
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qb3 b6 Nc3 Nbd7 Rfc1 Bb7/Queen's gambit declined/
e4 c5 Nf3 d6 Bb5+ Nd7 d4 cxd4 Qxd4 e5 Qd3 a6 Bxd7+ Bxd7 O-O h6 c4 Nf6 Nc3 Be7/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 c5 Nf3 Nc6 Bb5 d6 O-O Bd7 Re1 Nf6 c3 a6 Ba4 b5 Bc2 e5 h3 g6 a4 Bg7/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
d4 d5 c4 e6 Nc3 c6 e3 f5 g4 fxg4 Qxg4 Nf6 Qg2 c5 cxd5/QGD/semi-Slav
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O cxd5 Nxd5 Qc2 Nb4/Queen's Indian/Riumin variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 Be7 O-O-OO-O Nb3 a6 f3 b5/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8 Nd5 cxd5 Qb5 Ng5 Qb6/Dutch defence/
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 Nbd7 Bd3 Nb6/QGD/exchange, positional line
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O dxc4 Bxc4 b5 Bd3 a4 Bb7 e4 Be7/QGD Slav/4.e3
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O Qc2 c5 d5 exd5 Ng5 g6 Qd1 d6/Queen's Indian/anti-Queen's Indian system
e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Na6 O-O c5 d5 Bg4 Bc4 Nc7 h3 Bxf3/Pirc/Austrian attack, 6.Bd3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Bb5 Bd7 Bxc6 bxc6 Qf3 Qa5 Bxf6 gxf6/Sicilian/Richter-Rauzer, Margate (Alekhine) variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qb3 dxc4 Qxc4 O-O g3 Bxf3/Queen's Indian/Petrosian system
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 c5 Bd2 Bxc3 Bxc3 cxd4 Bxd4 Nc6 Bc3 Qc5/Nimzo-Indian/classical, Noa variation
d4 Nf6 Nf3 e6 c4 c5 d5 exd5 cxd5 d6 Nc3 g6 e4 Bg7 Bg5 O-O Nd2 a6 a4 Qc7/Benoni/classical, 8.Bg5
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Be7 c3 Nc5/Ruy Lopez/open, 8...Be6
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 c6 Bb2 b5 Nbd2 e4 Rb8 Re1 Nb6/King's Indian/fianchetto without c4
e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6 Bg5 Bxc3 bxc3 Qe7 Bxc6 bxc6 Nd2 h6/Four knights/symmetrical, Metger unpin
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 e4 Bg7 Bd3 O-O O-O a6 a4 Bg4/Benoni/classical with e4 and Nf3
c4 e6 Nc3 Bb4 Nf3 Ne7 d4 Bxc3+ bxc3 d6 e4 Nbc6 d5 Nb8 Be2 Na6 Be3 O-O O-O b6/English opening/
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Bf4 a6 a4 Qe7 h3 Nbd7 Nd2 Ne5/Benoni defence/
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 Be7 a4 b4 cxb4 cxb4 a5 O-O Bg5 h6/Queen's pawn game/
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 O-O Nf3 d5 O-O dxc4 Bxc4 Nbd7 Qe2 a6 a3 Ba5/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 Bxc4 e6 h3 Bh5 Nc3 Nf6 g4 Bg6 Ne5 c5/QGA/Alekhine defence
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 a6 e3 Be7 Be2 O-O O-O Qc7 Bd2 d6 Rc1 Nbd7 b3 Rb8/English/symmetrical variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 d6 Be3 Nf6 f4 O-O Be7 Bf3/Sicilian/Taimanov variation
d4 f5 g3 Nf6 Bg2 e6 Nf3 d5 O-O Bd6 c4 c6 b3 Qe7 Ne5 O-O Bb2 Bd7 Qc1 Be8/Dutch defence/
c4 e5 Nc3 Nc6 Nf3 f5 d4 e4 Ng5 Be7 Nh3 Nf6 e3 O-O/English/three knights system
b4 e5 Bb2 f6 b5 d5 e3 Be6 d4 e4 Nd2 c6 a4 Bd6 c4 f5/Polish (Sokolsky) opening/
e4 c5 Nf3 d6 Bb5+ Nc6 O-O Bd7 c3 Nf6 Re1 a6 Bxc6 Bxc6 d4 Bxe4 Bg5 Bc6 Bxf6 gxf6/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 cxd4 exd4 Be7 O-O O-O Nc3 Nc6 Rd1 Nb4/QGA/classical variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxc3 bxc3 Qxd5 Qb3 Be6 Qxd5 Bxd5 e3 Nd7/Gruenfeld/5.Bg5
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 Nf3 g6 Nd2 Bg7 Nc4 Bg5 h6 Bh4 a6/Benoni/Nimzovich (knight's tour) variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be3 e5 Ndb5 a6 Na3 b5 Nd5 Nxd5 Qxd5 Qc7/Sicilian/
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 dxc4 Bg2 c3 bxc3 Bxc3 Rb1Ne4 O-O Bxd2 Bxd2 Nxd2/Queen's gambit declined/
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Bg5 Bf5 e3 Nbd7 Bd3 Bxd3 Qxd3 Bd6 O-O O-O/Queen's gambit declined/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 c6 Bd1/King's Indian/Averbakh system
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 Bd2 Be7 Qe2 Nbd7 Rfd1 c5/Nimzo-Indian/4.e3, main line with ...b6
e4 g6 d4 Bg7 Nc3 d6 h4 h5 Be3 c6 Qd2 b5 Nh3 Bxh3 Rxh3 Nf6 f3 Nbd7 a4 a6/Robatsch (modern) defence/
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Ne7 Bxc4 O-O Be3/QGA/3.e4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 Nxd5 Nc3 Nxc3 bxc3 Qa5 Qb3 Nd7/Neo-Gruenfeld, 6.O-O c6/
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Bf5 Qb3 Qb6 Na4 Qxb3 axb3Na6 Bd2 Nf6 e3 Nb4/Queen's gambit declined/
Nf3 g6 e4 d6 d4 Nf6 Nc3 Bg7 Be2 O-O O-O Bg4 h3 Bxf3 Bxf3 Nc6 d5 Ne5 Be2 c6/Pirc/classical system, 5.Be2
d4 f5 g3 Nf6 Nf3 g6 c4 d6 b4 Bg7 Bb2 O-O Bg2 e6 Nbd2 Qe7 O-O Nbd7 Qb3 Kh8/Dutch defence/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 a6 e5 b5 Qb3 Nfd7 h4 c5/Gruenfeld/Russian, Alekhine (Hungarian) variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd3 Be7 O-O-OO-O Nb3 a5 a3 a4/Sicilian/Richter-Rauzer, Keres variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Bd5 Qa4+Qd7 Qxd7+ Nbxd7 Nc3 Bb4/Queen's pawn game/
e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6 f5 Nge7 fxe6 dxe6 d3 a4 Nd4 O-O Nec6/Sicilian/Grand Prix attack, Schofman variation
e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 Bb5+ c6 dxc6 bxc6 Qf3 cxb5 Qxa8 Bc5 b4 Bxb4/two knights defence/Blackburne variation
d4 f5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O d6 Nc3 Qe8 Qc2 Qh5 Bg5 h6 Bxf6 Bxf6/Dutch/Ilyin-Genevsky variation with Qc2
d4 f5 Nf3 Nf6 c4 g6 Nc3 Bg7 g3 O-O Bg2 d6 O-O Nc6 d5 Ne5 Nxe5 dxe5 e4 f4/Dutch/Leningrad, main variation with Nc6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 Nbd7 Qd2 c5 Rd1/King's Indian/Averbakh system
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Bg5 Bg7 Nd2 h6 Bh4 g5 Bg3 Nh5/Benoni/Uhlmann variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 Re1 Be7 e4 cxd4/QGA/classical, 6...a6
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 Nc3 dxc4 Bxc4 b5 Bd3 e4 c5 d5 Qc7/QGD semi-Slav/Meran, Reynolds' variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 d5 Ne5 Nd7 Nxe4 dxe4/Queen's Indian/old main line, 7.Nc3
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 Qe2 b6 Rd1 Bb7/QGA/classical, 6...a6
d4 Nf6 c4 e6 Nf3 c5 d5 d6 Nc3 exd5 cxd5 g6 Nd2 Bg7 Nc4 g3 Ne8 Bg2 Nd7/Benoni/Nimzovich (knight's tour) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bf4 Nxc3 bxc3 c5 e3 O-O Be2/Gruenfeld/5.Bg5
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 Qc2 b6 Nc3 Bb7 O-O Rc8/Queen's pawn game/
e4 c5 Nf3 d6 Bb5+ Nd7 O-O a6 Bxd7+ Bxd7 d4 cxd4 Qxd4 e5 Qd3 h6 a4 Nf6 c4 b5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Bd3 Nbd7 Qe2 Rd1 Bb7 Nbd2 Qc7/QGA/classical, 6...a6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e6 g4 h6 f4 Nc6 h3 Bd7 Qf3 Rc8/Sicilian/Najdorf, Byrne (English) attack
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Rd1 Nc6 Be2 Nb6/Gruenfeld/Russian, Smyslov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 c6 O-O Na6 Qc2/King's Indian/Gligoric-Taimanov system
d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 Na6 a3 dxc4 Bxc4 c5/QGD/4.Nf3
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Qa4 Bd7 Qxc4 cxd4 Nxd4 Rc8 Nc3 Qa5/Catalan/open, 5.Nf3
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 dxc4 Qa4+ Qd7 Qxc4 b6 e3 Ba6/Gruenfeld/5.Bg5
d4 e6 c4 c5 d5 Nf6 Nc3 exd5 cxd5 d6 e4 g6 Nge2 Bg7 Ng3 Be2 h5 Bg5 Qb6/Benoni/6.e4
e4 c5 Nf3 d6 Bb5+ Nc6 O-O Bd7 Re1 Nf6 c3 a6 Bf1 Bg4 d4 cxd4 cxd4 Bxf3 gxf3 d5/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qc2 b6 Rd1 Ba6 b3 Nbd7/Queen's gambit declined/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O h6 b3 b6 Bb2 Bb7/QGD semi-Slav/Stoltz variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d6 h3 Nb8 d3 c5/Ruy Lopez/closed, Breyer defence
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f3 e5 Nb3 Be6 Be3 h5 Qd2 Nbd7 a4 Be7/Sicilian/Najdorf
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O d6 Bxc6+ bxc6 d4 exd4 Qxd4 c5 Qd3 Bb7 Nc3 Be7/Ruy Lopez/Steinitz defence deferred (Russian defence)
c4 e6 Nf3 d5 b3 Nf6 Bb2 c5 e3 Nc6 cxd5 exd5 Bb5 Bd7 O-O Bd6/English/Wimpey system
e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 exd6 cxd6 Nc3 g6 Nf3 Bg7 Be2 O-O Be3 Nc6 h3 Bf5/Alekhine's defence/exchange variation
e4 e5 Nf3 d6 d4 Nf6 Nc3 Nbd7 Bc4 Be7 O-O h6 a4 c6 Ba2 O-O h3 Qc7 Be3 Re8/Philidor/Improved Hanham variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Qb6 Nb3 e6 Be2 a6 O-O Bd7 Kh1 Qc7/Sicilian/Richter-Rauzer
e4 c5 Nf3 d6 Bb5+ Nd7 d4 Nf6 Nc3 a6 Bxd7+ Nxd7 O-O e6 Bg5 Qc7 a4 h6 Bh4 cxd4/Sicilian/Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack
e4 d5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nf3 a6 g3 b5 Bg2 Bb7 O-O Ne5 Bxg2 Kxg2 b4/Scandinavian/Pytel-Wade variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Qe2 Qc7 O-O-O Na5 Bd3 b5/Sicilian/Sozin, 7.Be3
e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 Nce2 c5 c3 cxd4 cxd4 f6 exf6 Nxf6 Nf3 Nc6 Ng3 Bd6/French/Steinitz variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Nxc6 bxc6 Bd3 d5 O-O Nf6 Re1 Bb7 Bg5 Be7/Sicilian/Taimanov variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Be3 Bg7 Nc3 Nf6 f3 O-O Nb3 d6 Qd2 Be6 O-O-O a5/Sicilian defence/
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Bd3 Nbd7 Qe2 Qc7 Rd1 b6 Nc3 Bb7/QGA/classical, 6...a6
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 Nbd7 Qe2 a6 a4 Qe7/Nimzo-Indian/4.e3, Gligoric system, Bronstein variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 Bf4 Ng6 Bg3 Be7 O-O O-O Qd2 b5/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 e5 f4 f6 exf6 exf6/King's Indian/Saemisch, 5...O-O
d4 d5 c4 e6 Nc3 c6 e3 f5 f4 Qh4+/QGD/semi-Slav
e4 e6 d4 d5 Nc3 Nf6 exd5 exd5 Nf3 Bd6 Bd3 Be6 O-O O-O Ne2 c6 Ng3 Qc7 b3 Nbd7/French defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 Nb3 f3 Bd7 O-O-O Be7/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Nc6 Rb1 O-O/Gruenfeld/exchange variation
e4 e5 Nf3 d6 d4 exd4 Nxd4 g6 Bc4 Bg7 O-O Nf6 Nc3 O-O Bg5 h6 Bh4 Nc6 Nxc6 bxc6/Philidor/Larsen variation
d4 Nf6 Nf3 e6 Bg5 c5 c3 h6 Bxf6 Qxf6 e4 b6 Bd3 Bb7 Nbd2 Qd8 O-O cxd4 Nxd4 Be7/Queen's pawn/Torre attack
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Re8 Be3 Ng4/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 e5 d5 Kh7/King's Indian/Averbakh system
e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 exd6 cxd6 Nc3 g6 Bd3 Bg7 Nge2 O-O d5 e5 O-O Na6/Alekhine's defence/exchange variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O Nc6 Nb3 O-O Bg5 Be6 Qd2 Ne5/Sicilian/dragon variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bf4 Qc2 c5 Nc3 cxd4/Queen's Indian/Yates variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O Bxb4 cxb4 Nbd2 d6 Qb3/Queen's Indian/Capablanca variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nc3 Rb8 Ne5 Na5 Bd2 Bb4/Catalan/open, 5.Nf3
e4 c6 d4 d5 Nd2 dxe4 Nxe4 Nd7 Nf3 Ngf6 Nxf6+ Nxf6 Bc4 Bf5 O-O e6 Ne5 Nd7 Bf4 Be7/Caro-Kann/Steinitz variation
e4 c5 c3 e6 Nf3 Nc6 d3 d5 Nbd2 Nf6 g3 Be7 Bg2 O-O O-O b5 Re1 Rb8 e5 Nd7/Sicilian/Alapin's variation (2.c3)
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 exd5 cxd5 h6 Bf4/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8 Nd2 Bd7/Benoni/classical, 9...Re8, 10.Nd2
c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 e6 O-O Nge7 d3 O-O/English/symmetrical variation
e4 e6 d4 d5 exd5 exd5 c4 Nf6 Nc3 Be7 Nf3 O-O Be3 c6 Qb3 dxc4 Bxc4 Nbd7/French/exchange variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 b3 O-O Bb2 Bf5 c4 Re8 Nbd2/King's Indian/fianchetto without c4
d4 d5 c4 dxc4 Nf3 a6 e3 Nf6 Bxc4 b5 Be2 Bb7 a4 b4 Nbd2 e6 O-O Nbd7 Nc4 Bd5/QGA/Alekhine defence
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d4 exd4 e5 Ne4 O-O Nc5 Bg5 Be7 Bxe7 Qxe7 Bxc6 dxc6/Ruy Lopez/Morphy defence
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 a3 Nc6 Nxc6 Qxc6 Bd3 b5/Sicilian/Scheveningen, 6.f4
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 c4 cxd4 Qxd4 d6 Nc3 Bg5 a6 Bxf6 Bxf6/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 g6 d4 exd4 Bg5 Be7 Bxe7 Qxe7 Bxc6 dxc6 Qxd4 Nf6 O-O O-O Nc3 Rd8/Ruy Lopez/fianchetto (Smyslov/Barnes) defence
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Rb1 a6 Nf3 Nc6/Gruenfeld/exchange variation
e4 d6 d4 Nf6 Nc3 g6 Be3 c6 f3 b5 g4 Bg7 Qd2 h5 g5 Nfd7 f4 Nb6 Nf3 d5/Pirc defence/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Be7 f4 Qc7 Nf3 O-O/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Nc6 Be3 e5 Nb3 a5/Sicilian/modern Scheveningen, main line
e4 e5 Nf3 Nf6 d4 Nxe4 Bd3 d5 Nxe5 Nd7 Nxd7 Bxd7 O-O Bd6 Nc3 Qh4 g3 Nxc3 bxc3 Qg4/Petrov/modern attack, Symmetrical variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 f5 d5 Bf6 Rc1 c5/Queen's Indian/old main line, 7.Nc3
c4 c5 Nf3 Nf6 g3 b6 Bg2 Bb7 O-O e6 Nc3 Be7 d4 cxd4 Qxd4 d6*/English/symmetrical, hedgehog system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 e5 dxe5 Nfd7 Bb2 dxe5 c4 Nc6 Nc3 b6/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 h6 Be3 e6 dxe6 Bxe6 Qd2 Kh7/King's Indian/Averbakh, 6...c5
d4 Nf6 Nf3 g6 Bg5 Bg7 Nbd2 d6 e4 O-O c3 Nbd7 Bc4 h6 Bh4 O-O g5 Bg3 Qe7/King's Indian/Torre attack
d4 f5 g3 Nf6 Bg2 d6 Nf3 g6 O-O Bg7 b4 O-O Bb2 Ne4 Nbd2 a5 b5 a4 Rb1 c6/Dutch defence/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 Bd2 O-O Rc1 Nb6 Bg5 h6 Bh4 c6 e3 N8d7/Gruenfeld/Three knights variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 Bd3 Nf6 O-O Ne5 h3 Bc5 f4/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 f4 h6 Bh4 Bd7 O-O-O Qc7/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 c5 dxc5 Qxd1+ Rxd1 Na6 Bxc4 Nxc5/Gruenfeld/5.Bf4
c4 c5 Nc3 Nf6 Nf3 d5 cxd5 Nxd5 e3 Nc6 Bb5 Nxc3 bxc3 Bd7/English/symmetrical, three knights system
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 c6 e3 Bg4 Qb3 Qb6 Nd2 Nbd7 cxd5 Nxd5/Gruenfeld/5.Bf4
e4 c6 Nc3 d5 Nf3 Bg4 h3 Bh5 d4 e6 exd5 cxd5 g4 Bg6 Ne5 h4 Nxe5 dxe5 Bb4/Caro-Kann/two knights, 3...Bg4
e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 c5 Be7 b4 O-O Nf3 b6 Rb1 Ne4 Qc2 f5/Caro-Kann/Panov-Botvinnik attack, 5...e6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O b5 Nxc6 Qxc6 f3 Bb7/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 e5 dxe5 dxe5/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Na5 f4 b6/Sicilian/Sozin, Leonhardt variation
e4 c5 Nc3 e6 g3 d5 exd5 exd5 Bg2 Nf6 d3 Nc6 Bg5 Be7 Nge2 d4 Bxf6 Bxf6 Nd5 Be5/Sicilian/closed, Korchnoi variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 f5 d5 Bf6 Rc1 Na6/Queen's Indian/old main line, 7.Nc3
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 b3 Ne4 Bb2 Bf5 e3 Nd7 Qe2 Qa5/Neo-Gruenfeld, 6.O-O c6/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 b4 Qd6 a3 O-O/Gruenfeld/5.Bg5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Ng4 Nf3 Nc6 Nc3 e6/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bh4 g5 Bg3 Nh6/King's Indian/Gligoric-Taimanov system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 e6 Nf3 h6 Bh4 exd5 cxd5 b5/King's Indian/Averbakh, main line
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 Nc6 a3 b6 e3/Nimzo-Indian/classical, Pirc variation
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4 Qa5 Bd2 Qa4 Qxg7 Rg8 Qxh7 cxd4/French/Winawer, advance, poisoned pawn variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bb5+ Bd7 e5 dxe5 fxe5 Nd5 Nxd5 exd5/Sicilian/Scheveningen, 6.f4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 O-O d6 b3 Qa5 Bb2 Qh5 Nbd2 Bh3 e3 Na6/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Nc5 f3 h6 Be3 Bd7/King's Indian/Averbakh system
e4 c5 Nc3 Nc6 d3 d6 g3 g6 Bg2 Bg7 f4 e6 Nf3 Nge7 O-O O-O Be3 b6 Bf2 Bb7/Sicilian/closed, 6.f4
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 d6 O-O Nbd7 Nc3 Ne4 Nxe4 Bxe4/Queen's Indian/Capablanca variation
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 e6 Ne5 Bd3 Bxd3 Qxd3 Nd7/Caro-Kann/classical, 6.h4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Be2 Be7 O-O O-O Be3 a6 Kh1 e5/Sicilian/modern Scheveningen, main line
b4 d5 Bb2 Nf6 e3 Bf5 Nf3 e6 c4 Nbd7/Polish (Sokolsky) opening/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O O-Od6 Qc2/Queen's Indian/Capablanca variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O Re1 Qc7 Nxc6 bxc6/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 Qd2 Nbd7 f3 Rc8 g4 Nb6/Sicilian/Najdorf, Byrne (English) attack
e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Bc4 c6 Nd2 Bg7 Ndf3 O-O O-O Nd7 Nd3 N7b6/Alekhine's defence/modern, Larsen variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Nc6 Nc3 e6 Bf4 Nd7/Neo-Gruenfeld, 6.O-O, main line/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Nb3 Qe3+ Qe2 Qxe2+ Bxe2 Nc6/Sicilian/Najdorf, 7...Qb6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Nc6 Be3 Qc7 Ndb5 Qb8/Sicilian/modern Scheveningen, main line
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O Bd6 h3 b5 Nde2 Ne7/Sicilian/Taimanov variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O Bd6 Nc3 O-O e4 Bxc4 e5 Bg5 Qe7/QGD Slav/4.e3
e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6 Bg5 Bxc3 bxc3 Bd7 d4 h6 Bh4 Qe7/Four knights/symmetrical variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O Bxb4 cxb4 Nbd2 d6 Re1 Qc7/Queen's Indian/Capablanca variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O d6 Qe2 b5 Bb3 Na5 d4 axb3 Nd7 Nc3 Bb7/Ruy Lopez/Steinitz defence deferred (Russian defence)
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 Bd6 Bg2 Nbd7 O-O O-O Nbd2 Qe7 a3/Queen's gambit declined/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 h3 c5/QGD semi-Slav/Stoltz variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Bg5 Na6 Nbd2 Be7 e3 Qe2 cxd4 Nxd4 Bxg2/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 d5 Ne5 Nd7 Bf4 Nxe5/Queen's Indian/old main line, 7.Nc3
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 Bg4 Bxc4 Nh5 Bg5 Bxf3 Qxf3 Qxd4/Gruenfeld/5.Bf4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 Nf6 O-O Be7 Be3 O-O f4 e5 fxe5 dxe5/Sicilian/modern Scheveningen, main line
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Ne7 Bxc4 Nbc6 Be3 Nxd4 Bxd4 O-O a3/QGA/3.e4
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Bd5 Qa4+Qd7 Qxd7+ Nbxd7 O-O c5/Queen's pawn game/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 h3 e5/QGD semi-Slav/Stoltz variation
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 h3 Bh5 g4 Bg6 Ne5 Nd7 Nxc4 b5 Na5 c5 Bd2 Ngf6/QGA/Alekhine defence
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 a6 O-O Nc6 Nc3 Rb8 e4 Be7 d5 Nb4 Ne5 Nd3/Catalan/open, 5.Nf3
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Ng4 Bg5 Qb6 Bb5 Bd7 O-O h6 Be3 Nxe3/Sicilian/classical
e4 g6 d4 Bg7 Nc3 c6 Bc4 d6 Qf3 e6 Nge2 Nd7 O-O Qe7 Bb3 e5 Bg5 Ngf6 Rad1 h6/Robatsch defence/
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 N1e2 e6 h4 h6 Nf4 Bh7 Bd3 Bxd3 Qxd3 Nf6/Caro-Kann/classical variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 e3 Nc6 Nf3 d5 a3 Qa5 O-O-O dxc4/Nimzo-Indian/classical, Pirc variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 cxd4 exd4 Nc6 O-O Be7 Be3 O-O/QGA/classical variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5 exd5 Nxd5 Bd2 Nxc3/Sicilian/Anderssen variation
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 a3 Bxc3+ bxc3 c5 Nf3 Bd7 Rb1 Qc7 Bd3 Ba4 O-O Nd7/French/Winawer, advance, positional main line
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3 f5 exf5 Bxf5 d4 e4 Ng5 d5 f3 e3 f4 Bd6/Ruy Lopez/modern Steinitz defence, siesta variation
c4 e5 Nf3 Nc6 d4 e4 d5 exf3 dxc6 fxg2 cxd7+ Qxd7 Qxd7+ Bxd7 Bxg2 O-O-O Bf4 Be6 Nd2 Bb4/English, Nimzovich variation/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 b6 e3 Bb7 Rd1 a6 Be2 Nc6/Nimzo-Indian/classical, Pirc variation
d4 e6 c4 f5 g3 Nf6 Bg2 Be7 Nc3 O-O Nh3 d6 Nf4 Qe8 O-O Bd8 e4 e5 dxe5 dxe5/Dutch defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Bd7 Qe2 Nxd4/Sicilian/Sozin, Leonhardt variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 b5 Qc2 Bb7 O-O c5 dxc5 Bxc5/Queen's gambit declined/
d4 e6 Nf3 f5 g3 Nf6 Bg2 Be7 O-O O-O c4 d5 b3 c6 Bb2 Qe8 Nbd2 Nbd7 Ne5 Qh5/Dutch/stonewall, Botwinnik variation
d4 Nf6 Nf3 g6 Bg5 Bg7 Nbd2 O-O e3 c5 c3 b6 Bd3 Bb7 O-O d6/King's Indian/Torre attack
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Qf6 b4 Nge7 b5 Na5/QGA/3.e4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 c5 dxc5/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 g5 hxg5 Bxg5 Nc6 Qd2 Qb6 Nb3 Bd7/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 a3 Bxc3+ Qxc3 dxc4 Qxc4 b6 Bf4Ba6 Qxc7 Qxc7 Bxc7 Nc6/Nimzo-Indian/classical, Noa variation, 5.a3
d4 d5 c4 dxc4 e3 e6 Bxc4 Nf6 Nf3 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nbd7 a3 b5/QGA/classical variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Nbd2 Nc5 c3 Be7/Ruy Lopez/open, Bernstein variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Bc5 Qd3 Qd7/Ruy Lopez/open, Motzko attack
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nc6 a3 a5/QGA/classical variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Nd5 Qb5 Be7 O-O Bf6 Qxc4 Nb6/Catalan/open, 5.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Be7 Re1 Nxd4 e5 Nb5/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bc4 e6 a4 Nxe4 Nxe4 d5 Bd3 dxe4 Bxe4 Nd7/Sicilian/Najdorf, Lipnitzky attack
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 Nc6 a3 b6 Rd1 Bb7 e4 e5/Nimzo-Indian/classical, Pirc variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bf4 Nc3 Ne4 Qc2 Nxc3/Queen's Indian/Yates variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 Na3 a6 c4 b4 Nc2 cxd4 Nfxd4 Bxg2 Kxg2 Qc8/Queen's pawn game/
e4 c5 c3 d5 exd5 Qxd5 d4 e6 Nf3 Nf6 Be2 Be7 O-O Nc6 c4 dxc5 Qxd1 Rxd1 Bxc5/Sicilian/Alapin's variation (2.c3)
e4 d6 d4 Nf6 Nc3 g6 Be3 c6 Nf3 Bg7 Qd2 b5 Bd3 Bg4 e5 b4 Ne2 Nd5 Bh6 O-O/Pirc defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Be7 f4 O-O Qe2 Nxd4/Sicilian/Sozin, 7.Be3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Qe8 Bd1 c6 Nge2 cxd5/King's Indian/Averbakh system
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 d5 Nf3 O-O O-O Nc6 a3 Bxc3 bxc3 Qc7 Bb2 Na5/Nimzo-Indian/4.e3, main line with 8...Bxc3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 c5 d5 b5 cxb5 Qa5 a4 Nbd7/King's Indian/Saemisch, 5...O-O
e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4 O-O Nxb5 Nxb5 a6 Nc3 d6 Qe1 b5 d3 Bb7/Sicilian/Grand Prix attack
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 c5 dxc5 Qa5 Rc1 dxc4 e3 Qxc5 Qa4+ Nc6 Bxc4 O-O/Gruenfeld/5.Bf4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Qa4+ c6 Qxc4 Be6 Qa4 Ne4 O-O Nd7 Nc3 Nxc3/Neo-Gruenfeld, 5.Nf3/
c4 Nf6 Nc3 e6 Nf3 b6 e4 Bb7 d3 d6 g3 Be7 Bg2 c5 O-O O-O/English/Queens Indian formation
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 O-O Nge2 Bg4 Qc2 Bxe2 Qxe2 Nbd7/QGD/exchange, positional line
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 Be7 O-O d6 Qd3 a6 Nbd2 Nbd7 c3 O-O a4 Rb8/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Be3 O-O Qf3 Nf5 Bxf5 exf5 Qa5/Sicilian/Scheveningen, 6.f4
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 b5 cxb5 a6 a4 h6/King's Indian/Averbakh, 6...c5
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qc2 b6 b3 Bb7 Bc3 Na6/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 dxc4 Bxc4 Nbd7 O-O c5/Queen's Indian/Petrosian system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 d6 O-O Re1 Nxd4 Qxd4 Ne7/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Qb6 Nde2 e6 O-O a6 h3 Be7 Be3 Qc7/Sicilian/Sozin, Benko variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Bd6 g3 Be6 Bg2 Nbd7/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 Nc6 Bb5 d6 O-O Bd7 c3 Nf6 Re1 a6 Ba4 c4 Bc2 Ng4 b3 b5 bxc4 bxc4/Sicilian/Nimzovich-Rossolimo attack (without ...d6)
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Qc2 g6 Bg5 Bg7 e3 Bd3 Bxd3 Qxd3 Nbd7/Queen's gambit declined/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 e3 Nc6 Nf3 d5 a3 Qa5 Nd2 Bb4/Nimzo-Indian/classical, Pirc variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 Ng4 Bg5 h6 Bh4 Bg3 Bg7 Be2 h5/Sicilian/Najdorf, Byrne (English) attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f3 e5 Nb3 Be6 Be3 Qd2 O-O Be2 a5/Sicilian/Najdorf
d4 f5 g3 Nf6 Bg2 g6 b3 Bg7 Bb2 O-O Nf3 d6 Nbd2 Nc6 O-O Re1 h6 c4 e5/Dutch defence/
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 O-O c5 dxc5/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Be3 Be7 c3 Qd7/Ruy Lopez/open, 8...Be6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Qe8 Bd1 Nc5 Bc2 a5/King's Indian/Averbakh system
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Be7 Bf4 c6 e3 Nbd7/Nimzo-Indian/classical, Noa variation
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qb3 b6 Nc3 Nbd7 cxd5 exd5/Queen's gambit declined/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 c4 e5 Nb5/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 f4 b5 Nb3/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Nb3 Nc6 Qd2 Be6 Nd5 Bxd5/Sicilian/dragon, Yugoslav attack, 7...O-O
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Qa4+ Nc6 Qxc4 Qd5 Qa4 O-O Nc3 Qd7 O-O Nd5/Neo-Gruenfeld, 5.Nf3/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Nbd7 Bd3 Nc5 g4 e5 Nf5 g6/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 Be7 O-O O-O f4 Qc7 Kh1 Nxd4/Sicilian/modern Scheveningen, main line
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Nc5 f3 a5 g4/King's Indian/Averbakh system
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qxd7+ Nbxd7 Nb5 Kd8 cxd5 exd5/Queen's Indian/Petrosian system
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nb3 e6 Bf4 Ne5 Be2 a6 Bg3 h5/Sicilian/Sozin, Benko variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bf4 Qd3 Na6 Nc3 d5/Queen's Indian/Yates variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nde2 e6 O-O Be7 a3 O-O Ba2 a6/Sicilian/Sozin, Benko variation
e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Be7 Bb3 O-O O-O d6 c3 h6 Nbd2 Nc4 Kh8 Ne3 Ng5/Two knights defence (Modern bishop's opening)/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 c6 e3 Be6 Nd2 Be2 dxc4 Bxc4 Bxc4/Gruenfeld/5.Bf4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 O-O d6 b3 Qa5 Qd2 Qh5 Nc3 Bh3 e4 Nbd7/King's Indian/fianchetto without c4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g3 Bg4 f3 Bd7 Be3 Bg2 Bg7 O-O O-O/Sicilian/
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Nge2 Nh5 Bxe7 Qxe7 g4 Nhf6/QGD/exchange, positional line
d4 Nf6 c4 e6 Nf3 c5 d5 d6 Nc3 exd5 cxd5 g6 h3 a6 a4 Qe7 Bg5 h6 Bh4 Nbd7/Benoni defence/
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Qxd4 Qxd4 Nxd4 Nf6 f3 Bc5 Be3 Nc6 Nc2 Bxe3/QGA/3.e4
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Bd3 Nbd7 Qe2 Qc7 Bd2/QGA/classical, 6...a6
d4 e6 c4 f5 g3 Nf6 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3 d6 Nf3 Nc6 O-O e5 d5 Ne7/Dutch defence/Dutch-Indian (Nimzo-Dutch) variation
c4 Nf6 Nc3 e6 e4 d5 e5 d4 exf6 dxc3 bxc3 Qxf6 d4 c5 Nf3 h6*/English/Mikenas-Carls, Flohr variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 h4 e5 d5 h6 Be3 h5 f3 c6/King's Indian/Averbakh system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Bg2 Nc6 g5/Sicilian/Scheveningen, Keres attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bb5+ Bd7 e5 dxe5 fxe5 Nd5 Nxd5 exd5 Bxd7+/Sicilian/Scheveningen, 6.f4
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 Qa5+ Bd2 Qd8 e3 Ne4 Bd3 f5 g4 Bd6 gxf5 exf5/Queen's gambit declined/
e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 Be2 cxd4 cxd4 Nh6 Nc3 Na4 Qa5+ Bd2 Bb4 Bc3 Bxc3+ Nxc3 Qb6 Bb5 Bd7/French/advance, Paulsen attack
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Bg4 Rc1 Nd7/Gruenfeld/exchange variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 a6 Nc3 e6 g3 b5 Bg2 Bb7 O-O Nd7 Re1 Be7 a4 bxa4/Sicilian/
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 Qc7 Bb2 dxc4/Nimzo-Indian/4.e3, main line with 8...Bxc3
d4 d6 e4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O c6 a4 Nbd7 a5 e5 dxe5 dxe5 Qd6 Re8/Pirc/classical system, 5.Be2
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Bf4 c5 d5 d6/Queen's Indian/Riumin variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 g6 Be3 Bg7 Nb3 O-O O-O a5 a4 Nb4/Sicilian/dragon, classical, Alekhine variation
d4 d5 c4 dxc4 e3 e6 Bxc4 Nf6 Nf3 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nc6 a3 b5/QGA/classical variation
c4 Nf6 Nc3 e6 Nf3 Bb4 g3 O-O Bg2 c5 O-O Nc6/English/Nimzo-English opening
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Be3 e5 Nf3 Bd2 exf4/Sicilian/Scheveningen, 6.f4
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 Bd6 Bg2 Nbd7 O-O O-O Nbd2 Re8 b3 Qe7/Queen's gambit declined/
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qc2 Bb7 Bg2 Nbd7 Ne5 Qb6 Nxd7 Nxd7/Queen's gambit declined/
e4 c6 d4 d5 Nd2 dxe4 Nxe4 Nd7 Nf3 Ngf6 Nxf6+ Nxf6 Ne5 Be6 Be2 g6 O-O Bg7 c4 O-O/Caro-Kann/Steinitz variation
e4 e6 d4 d5 Nd2 c5 Ngf3 a6 dxc5 Bxc5 Bd3 Nc6 O-O Nge7/French/Tarrasch, open variation
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 a6 O-O Nc6 Nc3 Rb8 e4 Be7 d5 Nb4 Ne5 exd5/Catalan/open, 5.Nf3
e4 c5 Nc3 Nc6 Bb5 Na5 Nf3 e6 O-O a6 Be2 b5 d4 cxd4 Nxd4 Bb7 Bf3 d6 Re1 Be7/Sicilian/closed, 2...Nc6
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 Nbd7 Bb2 e5 dxe5 Ng4 Nbd2 Ngxe5/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Bd7 f4 Rc8/Sicilian/Sozin, Leonhardt variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nc3 Bd6 Qe2 b5 e4 e5/Catalan/open, 5.Nf3
e4 d6 d4 Nf6 Nc3 g6 g3 Bg7 Bg2 O-O Nge2 Nc6 O-O e5 dxe5 dxe5 Bg5 Qxd1 Rfxd1 Ne8/Pirc/Sveshnikov system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Rg1 d5 Bf4 a6 exd5 Nxd5/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bf4 Bg7 Qa4+ Bd7 Qb3 b5 Bxd6 Qb6/Benoni defence/
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 a4 Nc6 Qe2 Rd1 Be7 exd4 O-O/QGA/classical, Rubinstein variation
c4 c5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nc7 Nf3 Nc6 O-O e5 b3 Be7 Bb2 O-O/English/symmetrical, Rubinstein system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 Be3 Ng4 Bg5 f6 Bc1 exd4/King's Indian/Gligoric-Taimanov system
e4 c5 Nf3 d6 d4 Nf6 Nc3 cxd4 Nxd4 Nc6 Bg5 Qb6 Nb3 e6 Qd2 a6 h4 Be7 h5 h6/Sicilian/Richter-Rauzer
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Be7 cxd5 exd5 b4 Ne4/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 Bd2 Bxc4 c5 a3 Ba5/Nimzo-Indian/4.e3, main line with ...b6
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 d5 Ne5 Nc1 e6 Be2 exd5/King's Indian/Saemisch, 5...O-O
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Nbd2 Nc5 c3 d4/Ruy Lopez/open, Bernstein variation
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qd2 dxc4 Bxc4 Nd7 O-O c5/QGD/Charousek (Petrosian) variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 b3 O-O Bb2 Ne4 Nbd2 Nxd2 Qxd2 Bf5 Nh4 Be6/King's Indian/fianchetto without c4
e4 g6 d4 Bg7 Nf3 d6 Be2 Nf6 Nc3 O-O O-O Nc6 d5 Nb8 Bg5 c6 h3 Nbd7 Re1 a6/Pirc/classical system, 5.Be2
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O O-O Ne4 Nxe4 Bxe4 Ne1 Bxg2 Nxg2 d5/Queen's Indian/old main line, 7.Nc3
e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6 g3 Nf6 Bg2 O-O O-O Re8 b3 a5 a3 Nbd7 Bb2 dxe4/Caro-Kann/closed (Breyer) variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 h6 Bf4 a6 Qd2/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 Qc7 Bd3 g6 a4 Bg7 Nf3 Nc6 O-O O-O/Sicilian/Najdorf, 6.f4
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bf4 a6 e4 Bg7 Qa4+ Bd7 Qb3 Bc8/Benoni defence/
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc5 dxc4 Bxc4 Qa5/QGD/Charousek (Petrosian) variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Qa4+ Nfd7 Na3 c5 dxc5 Nc6 O-O Nxc5 Qxc4 Ne6/Neo-Gruenfeld, 5.Nf3/
e4 e6 d4 d5 Nc3 Nf6 Bg5 dxe4 Nxe4 Nbd7 Nf3 Be7 Nxf6+ Nxf6 Bd3 c5 dxc5 Qa5+ c3 Qxc5/French/Burn variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 Nc6 Qd2 O-O O-O-O Be6 Kb1 Qa5/Sicilian/dragon, Yugoslav attack, Rauser variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Bd7 Qxc4 Bc6 Bg2 Nbd7 Nc3Nb6 Qd3 Bb4 O-O O-O/Queen's gambit declined/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d4 exd4 e5 Ne4 O-O Be7 Nxd4 O-O Nf5 d5 Bxc6 bxc6/Ruy Lopez/Morphy defence
e4 e6 d4 d5 e5 c5 c3 Qb6 Nf3 Bd7 Be2 Bb5 c4 Bxc4 Bxc4 Nbd2 dxc4 a3 Qb5 Qe2 cxd4/French/advance, Wade variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 f4 Nbd7 Be2 Bg7 O-O O-O Kh1 a6 Bf3 e5/Sicilian/dragon, Levenfish; Flohr variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O O-O e4 b5/QGA/classical variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bxf6 Qxf6 a3 Bxc3+ Qxc3 c6 e3 O-O/Nimzo-Indian/classical, Noa variation, 5.cd ed
b4 d5 Bb2 Nf6 e3 e6 b5 c5 Nf3 Bd6 c4 Nbd7 Be2/Polish (Sokolsky) opening/
d4 Nf6 Nf3 e6 Bg5 h6 Bh4 g5 Bg3 Ne4 Nbd2 Nxg3 hxg3 Bg7 c3 d6/Queen's pawn/Torre attack
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 a6 c4 Be7/Queen's pawn game/
e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 Nb5 Nb6 c3 a6 Na3 c5 f4 cxd4/French/classical, Alapin variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O Nc6 Nxd4 Bc5 Nb3 Bb6 c4 d5 cxd5 Nxd5 Nc3 Nxc3/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be2 Nge7 Bf4 Ng6 Nxc6bxc6 Bd6 Qb6 O-O c5/Sicilian/Taimanov variation
e4 e5 Nf3 Nc6 Bb5 Bc5 O-O Nd4 Nxd4 Bxd4 c3 Bb6 d4 c6 Ba4 d6 Na3 Bc7 f4 exd4/Ruy Lopez/classical (Cordel) defence
e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bb5 Nd4 O-O Nxb5 Nxb5 d6 d3 Nf6 e5 dxe5 fxe5 Nd5/Sicilian/Grand Prix attack
Nf3 Nf6 g3 g6 b3 Bg7 Bb2 O-O Bg2 d6 d4/Reti/King's Indian attack
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 Bc4 e6 N1e2 Bd6 Nf4 Nf6 O-O Qc7 Nxg6 hxg6/Caro-Kann/classical variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Bd3/Queen's Indian/Petrosian system
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 Nc6 Qa4 Bb4+ Bd2 Bd6 Bc3/Catalan/open, 5.Nf3
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qb3 Nbd7 Bg2 Bb7 Bf4 Qa5+ Bd2 Qb6/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 Nc6 Qd2 Nxd4 Qxd4Qa5 f4 e6 O-O-O Be7/Sicilian/Najdorf, 6.Bg5
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 Be7 f5 Nxd4/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 9...Be7
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 c5 dxc5 Qa5 Rc1 dxc4 Qa4+ Qxa4 Nxa4 Na6 e3 Bd7/Gruenfeld/5.Bf4
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qc2 b6 b3 Nbd7 Rd1 Bb7/Queen's gambit declined/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Bc5 Nbd2 O-O/Ruy Lopez/open, St. Petersburg variation
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O O-O Re8 Bf4 Bg4/Benoni/fianchetto variation
Nf3 d5 g3 c5 Bg2 Nc6 O-O e6 d3 Nf6 Nbd2 Be7 Re1 O-O e4 e5 Nd7/Reti/King's Indian attack, French variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 b5 a3 Nbd7 Qf3 Bb7 O-O-O Qb6/Sicilian/Najdorf, Polugayevsky variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O Be3 b6 f3 Be6/Sicilian/Najdorf, Opovcensky variation
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Ba5 b4 cxd4 Nb5 Bc7 f4 Ne7 Nf3 Bd7 Bd3 Bxb5/French/Winawer, advance, 5.a3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6 Qd2 Nbd7 f4 Qc7 f5 Bc4/Sicilian/Najdorf, Byrne (English) attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Be7 b3 Nxd4 Qxd4 d6/Sicilian/Taimanov variation
c4 e5 Nc3 Nc6 Nf3 Nf6 g3 Bc5 Bg2 d6 d3 O-O O-O h6 a3 a6 b4 Ba7/English/four knights, kingside fianchetto
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 Qc7 Be2 e5 Nb3 f5 Bc4 Bxc4 Qxc4/Sicilian/Najdorf, 6.f4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Nxc6 bxc6 Bd3 d5 O-O Nf6 Re1 Bb7 Bd2 Be7/Sicilian/Taimanov variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 h6 Bxf6 gxf6 Rd1 a6 Be2 h5/Sicilian/Richter-Rauzer, Rauzer attack
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 Nc3 d6 d4 Bd7 Bxc6 Bxc6 Qe2 exd4 Nxd4 Bd7 O-O Be7/Ruy Lopez/four knights (Tarrasch) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 a3 Nc6 Nxc6 bxc6 b3 Bb7/Sicilian/Scheveningen, 6.f4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 c5 dxc5 Qa5 e5 Nh5 Be3 Nc6/Gruenfeld/5.Bf4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Qd2 h6 Nf3 exd5 e3 a5/Gruenfeld/5.Bg5
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Nc6 Nc3 Bf5 Bg5 Nxe5/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 cxd5 cxd5 Ne5 Bg5 Qb6 Qd2 Nfd7/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 c5 cxd5 cxd4 Bxf6 Bxf6/Queen's Indian/Petrosian system
f4 e5 fxe5 d6 exd6 Bxd6 Nf3 g5/Bird/From gambit, Lasker variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4Qc7 f4 Qa5+ c3 Be7/Sicilian/Anderssen variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bh4 Nc6 d5 Ne7/King's Indian/Gligoric-Taimanov system
d4 e6 c4 f5 g3 Nf6 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3 d6 Nf3 Nc6 Rd1 Qe7 d5 Ne5/Dutch defence/Dutch-Indian (Nimzo-Dutch) variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 cxd5 exd5 Ne5 Nbd7 Qa4 Bd6/Nimzo-Indian/4.e3, main line with ...b6
Nf3 d5 g3 c6 Bg2 Bg4 h3 Bxf3 Bxf3 Nd7 d3 e6 Nd2 Bd6 e4 d4 Qb6/Reti/King's Indian attack (Barcza system)
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 c4 e5 Nb3 d4 e3 Bg4 f3 Be6 exd4 Bxc4/Queen's pawn game/
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Nf3 exd5 e3 O-O b4 Be6/Gruenfeld/5.Bg5
b3 e5 Bb2 Nc6 e3 d5 Bb5 Bd6 Nf3 f6 c4 a6 cxd5 axb5 dxc6 bxc6 Qc2 Ne7 Nc3 f5/Nimzovich-Larsen attack/modern variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 O-O cxd4 Nxd4 Bc5 Nb3 Bb6 c4 d5 cxd5 Nxd5 Na3 O-O/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Qf3 Qb6 a3 Nc6 Nxc6 bxc6 b3 Be7/Sicilian/Scheveningen, 6.f4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bh4 g5 Bg3 Ne4 e3 Be6 Bd3 Nxg3/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O O-Oc5 Nc3 cxd4 Qxd4 Nc6/Queen's Indian/Capablanca variation
d4 d5 c4 e6 Nc3 c6 Nf3 Nf6 Bg5 dxc4 e4 b5 e5 h6 Bh4 g5 Nxg5 hxg5 Bxg5 Be7/QGD semi-Slav/anti-Meran gambit
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O Be3 b5 a4 Bb7/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 d5 cxd5/Queen's pawn game/
d4 Nf6 Nf3 g6 Bf4 Bg7 Nbd2 O-O e3 d6 h3 Nbd7 Bc4 Qe8 O-O e5 dxe5 dxe5 Bh2 Qe7 e4 Nh5 Qe2 Nc5/King's Indian/London system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Qc7 O-O Na5 f4 b5/Sicilian/Sozin, 7.Be3
e4 c5 Nf3 d6 Nc3 Nf6 d4 cxd4 Nxd4 a6 f4 Nbd7 a4 b6 Be2 Bf3 e5 Nf5 Qc7/Sicilian/Najdorf, 6.f4
e4 c5 Nf3 Nc6 Bb5 g6 Bxc6 dxc6 d3 Bg4 Nbd2 Bg7 O-O Nf6 h3 Bxf3 Qxf3 O-O Qe2 e5/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 c6 Bb2 Qa5 Qd2 Qh5 Qg5 Qxg5 Nxg5 d5/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O Bd6 h3 Bf4 Qf3 Bxe3/Sicilian/Taimanov variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Bb7 d4 Re8/Ruy Lopez/closed, Flohr-Zaitsev system (Lenzerheide variation)
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 O-O d5 Nbd2 Bf5 b3 Ne4 Bb2 Qd7 Re1 f6/Neo-Gruenfeld, 6.O-O c6/
d4 d5 c4 dxc4 e4 c5 d5 Nf6 Nc3 e6 Bxc4 exd5 Nxd5 Be7 Nxf6+Bxf6 Qxd8+ Bxd8 Be3 Be7/QGA/3.e4
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 h3 Bg7 e4 O-O Bd3 Na6 O-O Nb4/Benoni defence/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Nge2 c6 Qd2 b5 Bh6 e5 Bxg7 Kxg7/King's Indian/Saemisch, 5...O-O
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Bd3 cxd4 exd4 Be7 Nc3 O-O Ne5 Nc6/QGA/classical, 6...a6
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5 Bd3 d4 Ne2 e5/Sicilian/Anderssen variation
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nbd7 Nb3 Bd6/QGA/classical variation
d4 d5 c4 e6 Nf3 c6 e3 f5 Bd3 Bd6 O-O Nf6 b3 Qe7 a4 O-O Ba3 Bxa3 Nxa3 a5/Queen's gambit declined/
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 Nc6 a3 a6 Rd1 Ne7/QGD/Charousek (Petrosian) variation
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 c4 Nc6 d4 cxd4 Nxd4 e6 O-O Nf6 Nc3 Be7 Be3 O-O/Sicilian/Canal-Sokolsky attack, Sokolsky variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5 exd5 Nxd5 Nxd5 exd5/Sicilian/Anderssen variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 Be3 Ng4 Bg5 f6 Bc1 Nc6 O-O Kh8/King's Indian/Gligoric-Taimanov system
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Nge2 Nh5 Bxe7 Qxe7 Qd2 g6/QGD/exchange, positional line
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 cxd4 cxd4 Be7 Bg5 O-O Qd3 Qb6 Nc3 b4/Queen's pawn game/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 Qe2 Be7 Rd1 O-O/Ruy Lopez/open, Howell attack
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 f5 Qc2 Nxd2 Qxd2 Bb4/Queen's Indian/old main line, 7.Nc3
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Bc6 Qc2 dxc4 e4 b5 Rd1/Queen's Indian/Petrosian system
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Rd1 Nb6 Qb3 e6/Gruenfeld/Russian, Smyslov variation
e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6 d4 exd4 exd5 Nf6 dxc6 Nxc6 Be2O-O O-O Re8 Nb3 Bg4/Caro-Kann/closed (Breyer) variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Bd2 Nd7/Ruy Lopez/closed, anti-Marshall 8.a4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Rd1 Nc6 Be2 Bxf3/Gruenfeld/Russian, Smyslov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Nc6 Rg1 h5 g5 Ng4 Be2 d5/Sicilian/Scheveningen, Keres attack
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 e6 c4 Be7 Nc3 O-O Be2 b6 O-O Bb7 b3 Nc6/Sicilian/Prins (Moscow) variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O dxc4 Bxc4 b5 Bd3 e4 c5 d5 e5/QGD Slav/4.e3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 d5 Ne5 Nf4 a6 a4 e6/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Bd6 Nb5 Be6 Nxd6+ cxd6/Nimzo-Indian/classical, Noa variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 h6 Bh4 dxc4 Qxc4 b5 Qc2 e4/Queen's gambit declined/
d4 Nf6 c4 e6 Nc3 c5 d5 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Bd3 O-O h3 Na6 O-O Nc7/Benoni/classical with e4 and Nf3
d4 f5 g3 Nf6 Bg2 g6 b3 Bg7 Bb2 O-O Nf3 d5 O-O c6 c4 Be6 Ng5 Bf7 Nc3 Qe8/Dutch defence/
Nf3 e6 g3 f5 Bg2 Nf6 O-O Be7 c4 O-O d4 c6 Nc3 d5 Ne5 Nbd7 Nxd7 Bxd7 Qd3 Qe8/Dutch/stonewall with Nc3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 g3 e5 Nde2 Nbd7 Bg2 b5 O-O Bb7 Nd5 Nxd5/Sicilian/Najdorf, Zagreb (fianchetto) variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Nf6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 g3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bg2 Bg7 Nf3 O-O O-O Re8 a4 Nbd7/Benoni/fianchetto variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Bxf6/Queen's Indian/Petrosian system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 Nxd5 Nc3 Be6/Neo-Gruenfeld, 6.O-O c6/
d4 f5 c4 Nf6 g3 g6 Bg2 Bg7 Nf3 O-O O-O d6 Nc3 c6 Rb1 Ne4 Qb3 Kh8 Rd1 Nxc3/Dutch/Leningrad, main variation with c6
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O b3 d6 Bb2 Qe8 c4 c6 Nbd2 h6 Qc2 g5/Dutch defence/
d4 Nf6 c4 b6 Nc3 Bb7 f3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 e6 Bb5+ c6 Bd3 Be7 Ne2 O-O/Queen's Indian accelerated/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 a6 f4 Qd2/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 Nxd5 h3 Nd7*/Neo-Gruenfeld, 6.O-O c6/
d4 e6 c4 f5 g3 Nf6 Bg2 d5 Nd2 c6 Nh3 Bd6 O-O O-O Nf3 b6 Bf4 Ba6 cxd5 cxd5/Dutch defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Nc6 Rg1 h5 g5 Ng4 Be2 Qb6/Sicilian/Scheveningen, Keres attack
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Nbd7 a4 a5 e4 c6/King's Indian/fianchetto without c4
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O d5 Nxd4 Be7 c4 O-O cxd5 Nxd5 Nc3 Nxc3 bxc3 e5/Queen's pawn game/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g3 g6 Nde2 Bg7 Bg2 O-O O-O Bd7 Nf4 Ne5/Sicilian/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 Nbd2 O-O c4 Ne4 e3 Nxd2 dxc4 Nxc4 Be6/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 d6 O-O Re1 Be7 Nxc6 Bxc6/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 g6 O-O Bg7 Bg5 O-O f4 Nc6 Nb3 Bd7/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 Nf3 e6 Bg5 c5 c3 Be7 Nbd2 cxd4 cxd4 d5 e3 O-O Bd3 Nc6/Queen's pawn/Torre attack
e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 d3 h6 Nf3 e4 Qe2 Nxc4 dxc4 Bc5 Nfd2 O-O/two knights defence/Yankovich variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qxd7+ Nbxd7 Nb5 Bd8 cxd5 Nxd5/Queen's Indian/Petrosian system
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 c4 O-O cxd5 cxd5 Ne5 Nc6 Nc3 e6 Nxc6 bxc6/Neo-Gruenfeld, 6.O-O, main line/
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 h6 Bh4 O-O Rc1 b6 cxd5 Nxd5 exd5 Bxe7 Qxe7/QGD/4.Bg5 Be7
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qb3 c5 e3 O-O a3 Ba5 dxc5 Qxc5/Nimzo-Indian/classical, Noa variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 Nc3 dxc4 Bxc4 b5 Bd3 Bb7 e4 b4 Na4 c5/QGD semi-Slav/Meran, Wade variation
e4 c5 g3 d5 exd5 Qxd5 Nf3 Bg4 Bg2 Qe6+ Kf1 Nc6 h3 Bh5 d3 Qd7 Na3 e6 Nc4 Nf6/Sicilian/Steinitz variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d6 O-O Qa5 h3 Be6 d5 cxd5 Nd4 Bd7/King's Indian/fianchetto, Kavalek (Bronstein) variation
d4 f5 Nf3 Nf6 c4 g6 g3 Bg7 Bg2 O-O O-O d6 Nc3 Qe8 b3 Nc6 Nb5 Qd8 d5 Ne5/Dutch/Leningrad, main variation
d4 Nf6 Nf3 e6 g3 b6 Bg2 Bb7 c4 Bb4+ Bd2 Bxd2+ Qxd2 O-O O-ONc6 Nc3 Na5 Qd3 d5/Queen's Indian/Capablanca variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 b5 Nxc6 Qxc6 e5/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 Bxb4 cxb4 O-O a5 Ne1 Bxg2 Nxg2 O-O/Queen's Indian/Capablanca variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 Be2 Be7 O-O O-O Nb3 b5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Bg5 Qc2 Be4 Qd2 h6/Queen's Indian/Yates variation
c4 e5 Nc3 Nf6 g3 Bb4 Bg2 O-O e4 Bxc3 dxc3/English/Bremen, Smyslov system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 a5 O-O O-O Qc2/Queen's Indian/Yates variation
d4 d5 c4 e6 Nf3 Nf6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 Qxc4 Qc2 Bb7 Bf4 Nd5/Catalan/closed, 5.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Be3 Rg1 O-O Qd2 a6/Sicilian/Scheveningen, Keres attack
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 Nbd7 Bd3 c5/QGD Slav/Semmering variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O h6 Rd1 Qe7 h3/QGD semi-Slav/Stoltz variation
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Qe2 b5 Bd3 exd4 Nc6 Bg5 Be7/QGA/classical, 7...b5
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O Nc6 Be3 O-O f4 Qb6 Na4 Qa5/Sicilian/dragon, classical, 8.O-O
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 Nbd2 O-O c4 Bf5 b3 Ne4 Bb2 Qa5 Qe1 Nxd2/King's Indian/fianchetto without c4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4Qa5+ c3 Ba6 Bd3 Be7/Sicilian/Anderssen variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 c6 Bb2 a5 a4 Na6 Nbd2 Bd7 e4 b5/King's Indian/fianchetto without c4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 a3 Bxc3+ Qxc3 dxc4 Qxc4 b6 Nf3Ba6 Qa4+/Nimzo-Indian/classical, Noa variation, 5.a3
e4 e6 d4 d5 Nd2 c5 exd5 Qxd5 Ngf3 cxd4 Bc4 Qd6 O-O Nf6 Nb3Nc6 Nbxd4 Nxd4 Nxd4 Bd7/French/Tarrasch, open variation
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 g3 g6 Bg2 Bg7 Nf3 O-O O-O Na6 Nd2 Rb8/Benoni/fianchetto variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nb3 e6 O-O Be7 Bg5 O-O Kh1 a6/Sicilian/Sozin, Benko variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 e6 Qd2 h6 Be3 exd5 cxd5 Re8/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 Bd7 Qd2 Rc8 Nb3 h6 Bxf6 gxf6 Bd3 Ne5/Sicilian/Richter-Rauzer, Larsen variation, 7.Qd2
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Be7 f4 O-O Qf3 Nxd4/Sicilian/Sozin, 7.Be3
e4 c5 Nf3 d6 d4 Nf6 Nc3 cxd4 Nxd4 a6 f4 Qc7 a4 g6 Bd3 Bg7 Nf3 Bg4 O-O O-O/Sicilian/Najdorf, 6.f4
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bxf6 Bxf6 Qc2 Na6 Rd1 c5 dxc5 Qa5/QGD/Neo-orthodox variation, 7.Bxf6
e4 e6 d4 d5 Nc3 Be7 Bd3 Nc6 Nf3 Nb4 Bb5+ c6 Be2 dxe4 Nxe4 Nf6 Nxf6+ Bxf6 O-O O-O/French/Paulsen variation
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O O-O Na6 Bf4 Nc7/Benoni/fianchetto variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Kh1 Nc6 Nxc6 bxc6/Sicilian/Scheveningen, 6.Be2
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Be3 Be7 Qf3 O-O O-O-O Nxd4/Sicilian/Scheveningen, Tal variation
d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 c6 Qc2 Na6 a3 Qe8 b4 e5/Dutch/Leningrad, main variation with c6
e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 e6 O-O Be7 c4 Nb6 h3 Bxf3 Bxf3 Nc6 Bxc6+ bxc6/Alekhine's defence/modern variation, 4...Bg4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nxc6 bxc6 Qd3Be7 Qg3 O-O O-O Rb8/Sicilian/Boleslavsky, Louma variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 O-O Bd6 Nc3 O-O e4 Bxc4 e5 h3 exd4/QGD Slav/4.e3
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 dxe5 dxe5 Nbd2 Qe7 b3 Rd8/King's Indian/fianchetto without c4
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 f4 Bg7 Bb5+ a4 O-O Nf3 Nf6/Benoni/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Bc4 Bg7 Bb3 Nbd7 Be3 a6 f3 Nc5 Qd2 Nxb3/Sicilian/dragon variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Bc4 Bd7 Qd2 Nc6 h4 Ne5/Sicilian/dragon, Yugoslav attack, 9...Bd7
c4 e5 Nc3 Nc6 Nf3 Nf6 e4 Bb4 d3 d6 g3 O-O Bg2 Ne8 O-O bxc3 f5/English/four knights, Nimzovich variation
f4 d5 Nf3 Nf6 g3 g6 Bg2 Bg7 O-O b6 d3 Bb7 c3 O-O a4 c5 Na3 Nc6 Bd2 a6/Bird's opening/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 d5 cxd5 exd5 Rc1 Nd7/Queen's Indian/old main line, 7.Nc3
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Qf6 Nxc6 Bc5 Qd2 dxc6 Nc3 Bd4 Bd3 Ne7 O-O Ng6 Kh1 Ne5/Scotch game/
e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 a6 Bb3 Ba7 Nbd2 O-O Nc4 exd5 Nxd5 O-O f6/Giuoco Piano/
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 O-O Qb6 dxc5 Bxc5 c4 Ne4/Queen's pawn game/
d4 f5 Nf3 Nf6 g3 g6 Bg2 Bg7 O-O O-O Nbd2 d6 c3 Nc6 b4 Qe8 Qb3+ Kh8 d5 Nd8/Dutch/
d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bxf6 Bxf6 Qb3 Rd1 Nd7 Bd3 b6/QGD/Neo-orthodox variation, 7.Bxf6
e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 e6 O-O Be7 c4 Nb6 Nc3 O-O exd6 cxd6 b3 d5/Alekhine's defence/modern variation, 4...Bg4
e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6 e5 Qe7 Qe2 Nd5 c4Nb6 Nc3 Qe6 Qe4 Ba6/Scotch/Mieses variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 exd5 Bg5 h6 Bh4 c5 dxc5 g5 Bg3 Ne4 e3 Qf6/Nimzo-Indian/classical, Noa variation, 5.cd ed
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Qe2 b5 a4/Catalan/open, 5.Nf3
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 Nbd7 Bd3 Bd6 O-O O-O e4 e5 cxd5 cxd5 exd5 exd4/QGD Slav/
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qc2 dxc4 e3 Bxf3 gxf3 b5/Queen's Indian/Petrosian system
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 Be3 c6 Qd2 Qe7 d5 cxd5/King's Indian/Gligoric-Taimanov system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 g5 hxg5 Bxg5 Nc6 Qd2 Be7 O-O-O Nxd4/Sicilian/Scheveningen, Keres attack
e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Nc6 e5 dxe5 dxe5 Nd5 O-O Ndb4 Be4 f5/Pirc/Austrian attack, 6.Bd3
d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bg5 h6 Bxf6 Bxf6 e3 O-O Qb3 cxd5 cxd4 Nxd4 exd5/QGD/4.Nf3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 c5 dxc5 Qa5 Bd2 Qxc5 Nf3 Nc6/King's Indian/Averbakh system
e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 Bd3 O-O Nce2c5 c3 f6 f4 cxd4/French/classical, Tarrasch variation
e4 d6 d4 Nf6 Nc3 e5 Nf3 Nbd7 g3 Be7 Bg2 O-O O-O c6 a4 Re8 h3 Bf8 Re1 Qc7/Philidor/Improved Hanham variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 d5 exd5 cxd5 Bc5 Na4 b6/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 d5 c4 e6 Nc3 c6 Nf3 dxc4 a4 Bb4 e3 b5 Nd2/QGD/semi-Slav, Noteboom variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 O-O cxd4 Nxd4 Bc5 Nb3 Bb6 c4 d5 cxd5 Nxd5 Na3 Ne5/Queen's pawn game/
d4 e6 e4 d5 Nd2 dxe4 Nxe4 Nd7 g3 Ngf6 Nxf6+ Nxf6 Bg2 c5 Nf3 cxd4 Qxd4 Qxd4 Nxd4 Bc5/French/Rubinstein variation
e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 c6 Ng5 Bxe2 Qxe2 dxe5 dxe5e6 O-O Be7 Ne4 O-O/Alekhine's defence/modern, Flohr variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 d5 exd5 exd5 Qe2 Be7 f3 O-O/Sicilian/Taimanov variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 dxe5 dxe5 b3 Nc5 Qxd8 Rxd8/King's Indian/fianchetto without c4
e4 g6 d4 Bg7 Nf3 d6 Be2 Nf6 Nc3 O-O O-O Nc6 d5 Nb8 h3 c6 Re1 b5 dxc6 b4/Pirc/classical system, 5.Be2
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 e3 O-O Rc1 Nbd7 cxd5 exd5 Be2 h6/Queen's Indian/Petrosian system
e4 e6 d4 d5 Nc3 Bb4 exd5 exd5 Bd3 Nc6 a3 Ba5 Be3 Nge7 Qh5 Be6 Nf3 Bxc3+ bxc3 Qd7/French/Winawer (Nimzovich) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 Bh4 Nxc3 bxc3 dxc4 Qa4+ c6 Qxc4 Qa5 e3 Na6/Gruenfeld/5.Bg5
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 g3 Bg7 Bg2 O-O O-O Re8 Bf4 Ne4/Benoni/fianchetto variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 O-O c6 b3 O-O Bb2 a5 c4 a4 e3 Ne4 Nfd2 Nc5/King's Indian/fianchetto without c4
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Qb3 c5 d5 Na6/Gruenfeld defence/Smyslov, Yugoslav variation
d4 c5 d5 e5 e4 d6 Nc3 Be7 Nf3 Bg4 Be2 Bxf3 Bxf3 Na6 O-O Nc7 a4 Bg5/Semi-Benoni ('blockade variation')/
d4 f5 g3 Nf6 Bg2 g6 c4 Bg7 Nc3 d6 Nh3 O-O d5 Nbd7 O-O Ne5 b3 c5 Qc2 a6/Dutch defence/
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Be6 Nc3 Qd7 Nf3 Bg4/QGA/3.e4
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 c4 e5 Nc3 Nc6 d3 g6 Nd5 Nce7 O-O Bg7 Rb1 Nxd5/Sicilian/Canal-Sokolsky attack, Sokolsky variation
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ Qd7 Qxd7+ Nbxd7 Nb5 Kd8 cxd5 Nxd5/Queen's Indian/Petrosian system
Nf3 d6 d4 f5 g3 Nf6 Bg2 g6 O-O Bg7 c4 O-O Nc3 Nc6 d5 Na5 b3 Ne4 Nxe4 Bxa1/Dutch/Leningrad, main variation with Nc6
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 cxd5 Nxd5 e4 Nxc3 bxc3 c5 Rb1 O-O Be2 Nc6 d5 Ne5/Gruenfeld/modern exchange variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 Bd6 Bg2 Nbd7 O-O O-O Nbd2 Re8 b3 e5 cxd5 cxd5/Queen's gambit declined/
d4 d5 c4 dxc4 Nf3 a6 e3 Bg4 Bxc4 e6 h3 Bh5 Nc3 Nd7 Be2 Ngf6 e4 Bxf3 Bxf3 e5/QGA/Alekhine defence
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 Bxc6+ bxc6 d4 f6 Nc3 Ne7 Be3 a5 Qd2 Ng6 h4 h5/Ruy Lopez/modern Steinitz defence, Alapin variation
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Bg4 f3 Be6 Nbc3 Qd7 Ne4 Bd5/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Qc7 Bd3 b5 Nxc6 Qxc6 O-O Bb7 Kh1 Nf6/Sicilian/Taimanov variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 f3d5 cxd5 b6 b4 Na4/Nimzo-Indian/classical, 4...c5
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 c5 O-O Nc6 Ne5 Bd7 Nxc4 cxd4 Bf4 Nd5 Nd6+ Bxd6/Catalan/open, 5.Nf3
d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 Bg5 Be7 Qa4+ c6 cxd5 Nxd5 Bxe7 Nxc3 Qxc6+ Nxc6/Queen's Indian/Petrosian system
e4 d6 d4 Nf6 Bd3 e5 c3 c6 Nf3 Qc7 O-O Be7 Re1 Bg4 Nbd2 Nbd7 h3 Bh5 Nf1 O-O/King's pawn opening/
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Qe2 b5 Bd3 exd4 Be7 Nbd2 Bb7/QGA/classical, 7...b5
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Nbd2 c5/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O h5 h3 b5 Nb3 h4/Sicilian/Taimanov variation
e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3 e6 Nbd2 Nc6 Bc4 Qd8 Nb3 cxd4 Nbxd4 Nxd4 Nxd4 Qc7/Sicilian/Alapin's variation (2.c3)
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Bf5 Bg5 Be7 Bxe7 Qxe7 e3 Nf6 Ne5 Nbd7 Nxd7 Nxd7/Queen's gambit declined/
e4 e6 d4 d5 Nc3 Nf6 Bg5 dxe4 Nxe4 Be7 Bxf6 gxf6 Nf3 b6 Bc4Bb7 Qe2 Nd7 O-O-O c6/French/Burn variation
d4 e6 Nf3 f5 g3 Nf6 Bg2 Be7 O-O O-O c4 d6 b3 Qe8 Bb2 Nc6 Nbd2 Bd8 Qc2 e5/Dutch/classical variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 c5 Bb2 Ne4 Nbd2 f5 c3 Qa5 b4 cxb4 Qb3+ e6 cxb4 Qb5 e3 Nc6/King's Indian/fianchetto without c4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 e5 Nb5 a6 Nd6+ Bxd6 Qxd6 Qf6 Qxf6 Nxf6 Nc3 Nb4 Bd3 h6/Sicilian/Labourdonnais-Loewenthal variation
c4 e5 Nc3 Nc6 Nf3 Nf6 g3 Bb4 Bg2 O-O O-O e4 Ne1 Bxc3 dxc3 h6/English/four knights, kingside fianchetto
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 Be3 Nf6 Bd3 d5 exd5 exd5 Qd2 Bb4 a3 Ba5/Sicilian/Taimanov variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Be7 Nbd2 O-O/Ruy Lopez/open, classical defence
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Ne5 c6 Bf4 Nbd7/Queen's Indian/Riumin variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 e4 Ng4/QGA/classical variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Bd6 b3 c5 Qe2 Nc6/Nimzo-Indian/4.e3, main line with ...b6
e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Bc4 Ngf6 Ng5 e6 Qe2 Nb6 Bd3 h6 N5f3 c5 Be3 Qc7/Caro-Kann/Steinitz variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 d5 Bb5 dxe4 Nxc6 Qxd1+ Kxd1 a6 Ba4 Bd7 Nc3 Bxc6 Bxc6+ bxc6/Sicilian/Nimzovich variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 cxd4 exd4 Nc6 O-O Nxd4 Nxd4 Qxd4/QGA/classical variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 Bg5 h6 Bh4 dxc4 Qxc4 b5 Qc2 Bxf6/Queen's gambit declined/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6 Nb3 Qe2 h6 Bxf6 Bxf6/Sicilian/Najdorf, 7...Qb6
e4 e5 Nf3 Nc6 Bc4 Nf6 d4 exd4 e5 d5 Bb5 Ne4 Nxd4 Bd7 Bxc6 bxc6 O-O Bc5 Be3 O-O/Scotch gambit/Dubois-Reti defence
Nf3 d5 g3 c5 Bg2 Nc6 O-O e6 d3 Nf6 Nbd2 Be7 Re1 O-O e4 b5 a4 bxa4 Rxa4 a5/Reti/King's Indian attack, French variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Be3 O-O Be2 Nc6 O-O Bd7 Qe1 Nxd4/Sicilian/modern Scheveningen, main line
d4 Nf6 c4 d6 Nc3 e5 e4 exd4 Qxd4 Nc6 Qd2 g6 b3 Bg7 Bb2 O-O*/Old Indian/Ukrainian variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 a6 O-O Be7 f4 Qc7 Qe1 Nxd4/Sicilian/Taimanov variation
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qc2 b6 Bf4 Bb7 Rd1 Nbd7/Queen's pawn game/
d4 e6 c4 f5 Nf3 Nf6 g3 Be7 Bg2 O-O O-O d6 b3 Qe8 Bb2 a5 Nc3 Qh5 Re1 Na6/Dutch/classical variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d6 O-O Qa5 h3 e5 e4 Nbd7 Re1 exd4/King's Indian/fianchetto, Kavalek (Bronstein) variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 a6 e4 e5/QGD semi-Slav/Stoltz variation
e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6 Be3 a6 Qd2 b5 g3 b4 Ne2 a5/French/Steinitz, Boleslavsky variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 cxd5 Ne5 Nc6 Nc3 Bf5 Nxc6 bxc6/Neo-Gruenfeld, 6.O-O, main line/
e4 e6 d4 d5 Nc3 Nf6 Bg5 dxe4 Nxe4 Be7 Nxf6+ Bxf6 Bxf6 Qxf6 Nf3 O-O Bd3 c5 c3 cxd4/French/Burn variation
d4 d5 c4 e6 Nc3 Be7 Nf3 Nf6 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc5 Nc6 Be2 Qa5/QGD/Charousek (Petrosian) variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Qd2 h6 Nf3 exd5 e3 O-O/Gruenfeld/5.Bg5
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 b6 d5 Na6 Ng3 Nc7 Bd3 Rb8/King's Indian/Saemisch, 5...O-O
d4 d5 c4 e6 Nc3 Nf6 Nf3 Be7 Bg5 h6 Bxf6 Bxf6 e3 O-O Qc2 dxc4 Bxc4 Nd7 O-O/QGD/4.Nf3
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O dxc4 Bxc4 cxd4 exd4 a6 a4 Nbd7/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 b5 Be2 Re8/QGD semi-Slav/Stoltz variation
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Qc2 Nh5 Bxe7 Qxe7 O-O-O g6/QGD/exchange, positional line
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O Bxb4 cxb4 Qd3 d6 Nbd2 Qc7/Queen's Indian/Capablanca variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 g6 Be3 Bg7 O-O O-O Kh1 Bd7 f4 Rc8/Sicilian/dragon, classical, 8.O-O
c4 f5 d4 Nf6 g3 g6 Bg2 Bg7 Nf3 O-O O-O d6 Nc3 Qe8 b3 e5 dxe5 dxe5 Ba3 Rf7/Dutch/Leningrad, main variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 e6 Qd2 exd5 exd5 Re8 Nf3 Bg4/King's Indian/Averbakh, main line
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O dxc5 Bxc5 Nc3 Ne4 Nh4 Nxc3/Queen's Indian/Capablanca variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 e5 dxe5 Nfd7 Bb2 dxe5 e4 Nc6 Na3 Nc5/King's Indian/fianchetto without c4
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 d3 d6 c3 Bd7 Nbd2 g6 Nf1 Bg7 Ng3 O-O O-O Re8/Ruy Lopez/Anderssen variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 O-O Be7 a4 f4 Nc6 Kh1 Bd7/Sicilian/Scheveningen (Paulsen), classical variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O Qc2 c5 d5 exd5 Ng5 h6 Nxd5 Bxd5/Queen's Indian/anti-Queen's Indian system
e4 d6 d4 Nf6 Nc3 c6 f4 Qa5 Bd2 Qb6 Nf3 Bg4 h3 Bxf3 Qxf3 Qxd4 O-O-O Nbd7 g4 g6/Pirc/Ufimtsev-Pytel variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Nbd2 Na5/Ruy Lopez/closed, anti-Marshall 8.a4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 c5 Bd2 Bxc3 Bxc3 cxd4 Bxd4 Nc6 Bc3 e5/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 g3 Nc6 Nde2 Bd7 Bg2 Qc8 h3 Bg7 Be3 O-O/Sicilian/dragon variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Ndb5 Nb6 Bf4 Ne5 Qh5 g6/Sicilian/Scheveningen, Keres attack
e4 g6 d4 Bg7 Nc3 d6 Be3 a6 Qd2 b5 a4 b4 Nd1 a5 c3 Nf6 f3bxc3 bxc3 Ba6/Robatsch (modern) defence/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 c5 b3 dxc4 Bxc4 cxd4 Nxd4 Bd6 Bb2 O-O O-O Bd7/QGD Slav/
d4 d5 c4 dxc4 e3 e6 Bxc4 Nf6 Nf3 c5 Qe2 a6 dxc5 Bxc5 O-O Nc6 a3 O-O b4 Ba7/QGA/classical variation
e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5 Nf3 Nc6 Be3 a6 Qd2 b5 h4 cxd4 Nxd4 Nxd4/French/Steinitz, Boleslavsky variation
e4 e6 d4 d5 Nd2 Nc6 Ngf3 Nf6 e5 Nd7 Be2 f6 exf6 Qxf6/French/Tarrasch, Guimard main line
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 Ng4 Bg5 f6 Bc1 Nc6 h3 Nh6/King's Indian/Gligoric-Taimanov system
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Qa4 Bd7 dxc5 Bxc5 Qxc4 Be7 Nc3 O-O/Catalan/open, 5.Nf3
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Qb6 Nb3 e6 Bxf6 gxf6 Be2 a6 Bh5 Bd7/Sicilian/Richter-Rauzer
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 dxc4 Qc2 Qd5 O-O Nc6 e3 Bxd2 Bxd2 Qh5/Queen's gambit declined/
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 Bf4 a6 e4 Bg7 Qa4+ Bd7 Qb3 b5/Benoni defence/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2 d5 cxd5 exd5 Ne5 Nd7/Queen's Indian/old main line, 7.Nc3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Qd2 Be7 f3 O-O g4 Nxd4 Bxd4 d5/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 Nbd7 Qe2 e6 f4 Qc7 O-O-O b5 a3 Bb7/Sicilian/Najdorf, 6.Bg5
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 d4 cxd4 cxd4 d5 e5 Ne4 Be3 e6/Sicilian/Canal-Sokolsky attack, Bronstein gambit
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 a6 Qd2 c5 d5 b5 cxb5 Qb6 a4 axb5/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Bd6 Bg5/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Nc6 Nf3 Qb6 Bd3 Be7/Sicilian/Scheveningen, 6.f4
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 e3 d6 Nge2 h5 h4 Nh6/English/closed system
d4 Nf6 Nf3 d5 c4 dxc4 e3 e6 Bxc4 c5 Qe2 cxd4 exd4 Bb4+ Nc3O-O O-O Nbd7 Bb3 b6/QGA/classical variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 b5 Bxf6 gxf6/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Bd3 Qc7 O-O Kh1 O-O Qe2 Nbd7/Sicilian/Scheveningen, 6.f4
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e5 Nf3 Nbd7 a4 Bc4 Qc7 Qe2 b6/Sicilian/Najdorf, 6.f4
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 O-O Bf4 Bxc5 Nf3 Nc6 a3 Be7 Rd1 Qa5 e4 Rd8/Nimzo-Indian/classical, Pirc variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Nc6 Be3 a6 Qe1 Bd7/Sicilian/modern Scheveningen, main line
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 Qa5 Nf3 Nc6 Rb1 cxd4/Gruenfeld/exchange variation
e4 g6 d4 Bg7 Nc3 c6 f4 d5 e5 Nh6 Bd3 f6 Nf3 Bg4 h3 Bxf3 Qxf3 O-O exf6 exf6/Robatsch defence/
e4 e5 Nf3 Nc6 Bb5 Nd4 Nxd4 exd4 O-O Bc5 d3 c6 Ba4 Ne7 Qh5 d5 Nd2 O-O Nf3 f6/Ruy Lopez/Bird's defence
e4 c6 d3 d5 Nd2 e5 Ngf3 Bd6 g3 Nf6 Bg2 O-O O-O Re8 b3 a5 a3 Nbd7 Bb2 Nf8/Caro-Kann/closed (Breyer) variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 c5 O-O Nc6 Qa4 Bd7 Qxc4 Qd3 Rc8 dxc5 Bxc5/Catalan/open, 5.Nf3
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 g6 Be3 Bg7 h3 O-O Qd2 Bd7 g4 Nxd4/Sicilian/classical
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Nb4 Be4 f5 exf6 exf6 a3 f5/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 g5 hxg5 Bxg5 Nc6 Qd2 a6 O-O-O Bd7/Sicilian/Scheveningen, Keres attack
e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 Bxc6 dxc6 Be3 Bd6 h3 O-O Nbd2Nd7 Nc4 c5 a4 Qe7/Ruy Lopez/Berlin defence
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Qe2 b5 Bd3 cxd4 exd4 Be7/QGA/classical, 7...b5
e4 e6 d4 d5 Nc3 Bb4 e5 Ne7 a3 Bxc3+ bxc3 c5 Qg4 O-O Bd3 exf6 Rxf6 Bg5 Nd7/French/Winawer, advance, poisoned pawn variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 Qb6 Nb3 a6 Be2 Qc7 f4 b5/Sicilian/Richter-Rauzer, Rauzer attack
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 d6 Nc3 g6 g3 Bg7 Bg2 O-O O-O Re8 Re1 Ne4/Benoni/fianchetto variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Be7 O-O O-O f4 Nc6 Be3 a6 Kh1 Bd7/Sicilian/modern Scheveningen, main line
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 d6 Nc3 Nbd7 O-O Ne4 Qc2 Nxc3/Queen's Indian/Capablanca variation
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 O-O a3 Be7 Nf4 cxd5 Nxd5 Ncxd5 exd5/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Bg5 Bg7 f3 Nc6 Nb3 O-O Qd2 a6 O-O-O Re8/Sicilian/dragon variation
e4 c5 Nf3 d6 d4 cxd4 Qxd4 a6 Be3 Nc6 Qb6 Qxb6 Bxb6 Nf6 Nc3Nd7 Be3 e6 a4 Be7/Sicilian, Chekhover variation/
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 dxc5 dxc5 Qxd8 Rxd8 Bxc5 Nc6 Ba3 a5/King's Indian/Saemisch, 5...O-O
d4 d5 c4 dxc4 e3 e6 Bxc4 c5 Nf3 a6 O-O Nf6 Bd3 Nbd7 Re1 a4 bxa4 e4 cxd4/QGA/classical, 6...a6
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Nbxd2 exd4 Bxc4 Nc6 O-O Qf6 e5 Qg6 Re1/QGA/3.e4
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O Qc2 d5 cxd5 exd5 O-O Na6 Ne5 c5/Queen's Indian/anti-Queen's Indian system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 a3/Queen's Indian/Riumin variation
d4 d5 c4 e6 Nf3 c6 e3 f5 Bd3 Bd6 O-O Nf6 b3 Qe7 Bb2 O-O Nc3 Ne4 Ne2 Nd7/Queen's gambit declined/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 a5 Bb2 a4 c4 c5 Na3 Nc6 Nb5 Ne4/King's Indian/fianchetto without c4
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Nxd7 O-O Ngf6 Qe2 e6 b3 Be7 Bb2 O-O c4 e5 Nc3 Ne8/Sicilian/Canal-Sokolsky attack, 3...Bd7
e4 c6 d4 d5 e5 Bf5 Nd2 e6 Nb3 Nd7 Nf3 h6 Be2 Ne7 O-O Qc7 a4 a5 Bd2 g5/Caro-Kann/advance variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Bd7 Bb3 a6 O-O e6 Kh1 Be7 f4 O-O/Sicilian/Sozin, not Scheveningen
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Nc3 exd4 Nxd4 Ne7 Bxc4 Nbc6 Be3 O-O a3/QGA/3.e4
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Bg2 Nc6 Nb3 a6 g5 Nd7/Sicilian/Scheveningen, Keres attack
d4 d5 c4 e6 Nf3 Nf6 g3 Be7 Bg2 O-O O-O dxc4 Qc2 a6 a4 Bd7 Rd1 Bc6 Nc3 Bxf3/Catalan/closed, 5.Nf3
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O d5 Bb4 O-O bxc3 Na6 Ne1 Nc5/Queen's Indian/anti-Queen's Indian system
d4 d5 c4 e6 Nf3 c6 e3 f5 Bd3 Bd6 O-O Nf6 b3 Qe7 Bb2 O-O Qc1 Ne4 Ba3 Nd7/Queen's gambit declined/
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 d5 a3 Be7 c5/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 dxc5 Bxc5 Nd4 Qb6 e3 Ne5/Queen's gambit declined/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 c4 e5 Nf3 d4 O-O Nc6 e3 Be7 exd4 exd4/Queen's pawn game/
d4 d5 c4 e6 Nc3 c6 Nf3 dxc4 a4 Bb4 e3 b5 Bd2 a5 axb5 Bxc3 Bxc3 cxb5 b3 Bb7/QGD/semi-Slav, Abrahams variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nb3 e6 O-O a6 a4 Qc7 a5 Nxa5/Sicilian/Sozin, Benko variation
e4 c6 d4 d5 e5 Bf5 Nd2 e6 Nb3 Nd7 Nf3 h6 Be2 Ne7 O-O g5 Ne1 c5 Nxc5 Nxc5/Caro-Kann/advance variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 Be3 c6 d5 Ng4 Bg5 f6 Bh4 c5/King's Indian/Gligoric-Taimanov system
e4 e5 d4 exd4 Qxd4 Nc6 Qe3 Bb4+ Bd2 Nf6 Nc3 O-O O-O-O Re8 f3 d5 Be1 d4 Qf2 Qe7/Centre game/Paulsen attack
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 Bg4 Bxc4 Nh5 Be3 Bxf3 gxf3 e5/Gruenfeld/5.Bf4
c4 e5 Nc3 Nc6 g3 d6 Bg2 Be6 d3 Qd7 Rb1 g6/English, Troeger defence/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 Be7 O-O-OO-O Nb3 a6 f4 b5/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
c4 c5 Nf3 Nf6 d4 cxd4 Nxd4 e6 Nc3 Bb4 g3 O-O Bg2 d5 cxd5 Nxd5 Bd2 Nxc3 bxc3 Ba5/English/symmetrical variation
e4 c5 Nc3 d6 f4 g6 Nf3 Bg7 d4 cxd4 Nxd4 Nd7 Be2 Ngf6 Be3 a6 Nb3 b5 Bf3 Bb7/Sicilian/closed
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qb3 c5 a3 Ba5 Bd2 Nc6 dxc5 Qxc5/Nimzo-Indian/classical, Noa variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O O-O Ne4 Bd2 d5 cxd5 exd5 Ne5 Nxc3/Queen's Indian/old main line, 7.Nc3
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Qa4+ Nbd7 Bg2 a6 Qxc4 c5 dxc5 Bxc5 O-O b5 Qh4 Bb7/Queen's pawn game/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O Be6 Be3 O-O f3 b5/Sicilian/Najdorf, Opovcensky variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 e3 O-O Bd2 Bxc3 Bxc3b6 Be2 Nc6 Nf3 a5/Nimzo-Indian/classical, Noa variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 exd4 Qxd4 Nf6 Nc3 Be6 Qxd8+ Kxd8 Ne5 Ke7/QGA/3.e4
d4 Nf6 Nf3 e6 g3 c5 Bg2 Nc6 c4 cxd4 Nxd4 Qb6 Nc2 d5 cxd5 Nxd5 O-O Be7 Ne3 Nxe3/Queen's pawn game/
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qc2 Bb7 Bg2 Nbd7 a4 b4 Ne5 Qc8/Queen's gambit declined/
e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O c6 h3 Qc7 a4 e5 Re1 Nbd7 Be3 b6/Pirc/classical system, 5.Be2
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 Nc6 Qd2 e6 dxc5 dxc5 Bxc5 Qxd2+/King's Indian/Saemisch, 5...O-O
e4 e5 Nf3 Nc6 Bb5 d6 d4 Bd7 Nc3 Nf6 O-O Be7 dxe5 dxe5 Re1 Bd6 Bg5 Ne7 Bxd7+ Nxd7/Ruy Lopez/Berlin defence, hedgehog variation
c4 e5 Nc3 Nc6 Nf3 Nf6 e3 Bb4 Qc2 O-O d3 Re8 Bd2 d6 Be2 O-O e4 Ne1 Bg6/English/four knights, 4.e3
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 d5 c5 Ne4 Bd2 Nxd2 Qxd2 a5 a3 Bxc3/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 g3 d5 exd5 Qxd5 Nf3 Bg4 Bg2 Qe6+ Kf1 Nc6 h3 Bh5 d3 Qd7 Be3 e6 Nbd2 Rd8/Sicilian/Steinitz variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 Nbd7 Bc4 h6 Bxf6 Nxf6 Qe2 g6 O-O-O Qc7/Sicilian/Najdorf, 6.Bg5
Nf3 f5 d4 Nf6 g3 g6 Bg2 Bg7 c4 O-O Nc3 d6 O-O Nc6 b3 Ne4 Bb2 e5 dxe5 Nxc3/Dutch/Leningrad, main variation with Nc6
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O Nc6 Nb3 a5 a4 Be6 Be3 O-O/Sicilian/dragon variation
e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 d3 d6 c3 Bb6 Nbd2 Ne7 a4 c6 Bb3 Ng6 Nc4 Bc7/Giuoco Piano/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 f3a5 Bf4/Nimzo-Indian/classical, 4...c5
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 Qe2 cxd4 exd4 b5/QGA/classical, 6...a6
d4 f5 Nf3 Nf6 g3 g6 Bg2 Bg7 O-O O-O c4 d6 Nc3 Qe8 d5 a5 Rb1 Na6 b3 h6/Dutch/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 g5 hxg5 Bxg5 Nc6 Qd2 Qb6 Nb3 a6/Sicilian/Scheveningen, Keres attack
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 Nbd7 Nc3 dxc4 Bxc4 b5 Bd3 Bb7 O-O b4 Ne4 Be7 Nxf6+/QGD semi-Slav/Meran, Wade variation
e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5 O-O d6 c3 O-O Bb3 a6 Nbd2 Nc4 h6 a4 Be6/Giuoco Pianissimo/
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 cxd4 cxd4 Be7 Bg5 O-O Qd3 a6 Nbd2 Nc6/Queen's pawn game/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 d6 Bg2 Bd7 O-O a4 Be7 Nb3 O-O/Sicilian/Taimanov variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bf4 O-O Rc1 dxc4 e4 b5 Nxb5 Nxe4 Bxc7 Qd7 Bxc4 a6/Gruenfeld/5.Bf4
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Bd7 Nbd2 b5 Ne5 Nd5 Ndf3 Bd6/Catalan/open, 5.Nf3
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nf3 Qc7 Bg5 Nbd7 a4 Be7 O-O h6/Sicilian/Najdorf, Opovcensky variation
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 exd4 Nxd4/QGA/3.e4
c4 c6 Nf3 d5 g3 Nf6 Bg2 Bf5 O-O e6 cxd5 exd5 Nc3 Be7 d3 Nd4 Bh7 e4 O-O/English/Caro-Kann defensive system
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 g5 hxg5 Bxg5 Nc6 Qd2 Qb6 Nb3 Ne5/Sicilian/Scheveningen, Keres attack
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 dxc4 Qxc4 b5 Qc2 Bb7 Bg2 Nbd7 O-O c5 Nc3 b4/Queen's gambit declined/
c4 e5 Nc3 Nf6 g3 Bb4 Bg2 O-O Nf3 Re8 O-O e4 Ng5 Bxc3 dxc3 h6/English/Bremen, Smyslov system
e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4 O-O Nf3 Nbc6 Bd3 f5 Qg3 Qa5/French/Winawer, advance, poisoned pawn variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be2 a6 O-O Nge7/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 Be7 Bd3 Nc6 Nf3 O-O a3/Sicilian/Scheveningen, 6.f4
d4 d5 c4 e6 Nf3 c6 e3 f5 Bd3 Nf6 O-O Be7/Queen's gambit declined/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 Be2 a6 O-O Be7 a4 Qc7 Nb3/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 O-O O-O Be3 Nc6 Kh1 Bd7 f4 a6/Sicilian/dragon variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Rc1 c5 d5 exd5/Queen's Indian/Riumin variation
d4 e6 c4 f5 g3 Nf6 Bg2 Be7 Nf3 O-O O-O Ne4 Qc2 Bf6 Nc3 d5 Bf4 c6 Rad1 Nd7/Dutch defence, Alekhine variation/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 b4 c3 d6 d3 Re8/Ruy Lopez/closed, anti-Marshall 8.a4
d4 d5 c4 e6 Nc3 c6 e3 f5 Nf3 Nf6 Be2 Bd6 Ne5 O-O O-O Kh8 Rb1 Bd7 b4 Be8/QGD/semi-Slav
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be3 a6 Bd3 Nf6 O-O b5 Nxc6 Qxc6 f3 Bc5/Sicilian/Taimanov variation
d4 e6 g3 f5 Bg2 Nf6 c4 c6 Nd2 d5 Qc2 Bd6 Nh3 O-O O-O Qe7 Nf3 b6 Bf4 Bb7/Dutch defence/
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 d5 O-O e5 Nf3 Nc6 c4 d4 e3 Bc5 exd4 exd4/Queen's pawn game/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O Qc2 d5 cxd5 exd5 O-O Na6 Rd1 Qc8/Queen's Indian/anti-Queen's Indian system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 Nc6 c4 Qb6 Nc2 g6 Nc3 Nb5 O-O Be3 Qa5+/Sicilian/Prins (Moscow) variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 Qa4 Bd7 Qxc4 Na5 Qd3 c5 O-O Bc6 Nc3/Catalan/open, 5.Nf3
d4 d6 Nf3 g6 e4 Bg7 Be2 Nf6 Nc3 O-O O-O Bg4 Be3 Nc6 Qd2 dxe5 dxe5 Rad1 Qb8/Pirc/classical system, 5.Be2
d4 Nf6 c4 e6 Nf3 c5 d5 exd5 cxd5 g6 Nc3 d6 e4 a6 Qe2 Bg4 e5 Bxf3 gxf3 dxe5/Benoni/classical with e4 and Nf3
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 Be3 c6 d5 Ng4 Bg5 f6 Bh4 Na6/King's Indian/Gligoric-Taimanov system
e4 e5 Nf3 Nc6 Bb5 Nf6 d4 Nxe4 Qe2 Nd6 Bxc6 dxc6 dxe5 Nf5 O-O Nd4 Nxd4 Qxd4 h3 Bf5/Ruy Lopez/Berlin defence
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e6 Be2 Qc7 O-O Be3 Nbd7 Bf3 g6/Sicilian/Najdorf, 6.f4
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 c5 Nf3 d5 O-O dxc4 Bxc4 Nc6 a3 Ba5 Qd3 a6/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 c5 b3 cxd4 exd4 Nc6 Bb2 Bd3 Bb4 O-O Nxd2/QGD Slav/
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nf3 Qc7 a4 a5 Be6 Nd5 Nxd5/Sicilian/Najdorf, Byrne (English) attack
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Ne7 Ng5 Nxg5 Bxg5 Bb7/Ruy Lopez/open, Zukertort variation
e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 Bb5+ c6 dxc6 bxc6 Be2 h6 Nh3 Bd6 d3 O-O/two knights defence/Steinitz variation
c4 c5 Nc3 Nf6 g3 d5 cxd5 Nxd5 Bg2 Nc7 d3 e5 f4 exf4 Bxf4 Ne6/English/symmetrical, Rubinstein system
e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Be7 Nc3 d6 a3 O-O O-O Nd7 Nd5 Nxe7+ Qxe7 Bg5 Qe8/Two knights defence (Modern bishop's opening)/
e4 c5 Nf3 d6 Nc3 a6 d4 cxd4 Nxd4 Nf6 Bg5 Nc6 Qd2 e6 O-O-O Bd7 f4 b5 Bxb5 axb5/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Be3 a6 Bb3 Qc7 f4 Be7 Qf3 Nxd4/Sicilian/Sozin, 7.Be3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Nxc6 bxc6 e5 Nd5 Ne4f5 Nd6+ Bxd6 exd6 Qb6/Sicilian/Anderssen variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 d5 cxd5 Qxd5 Nf3 Qf5 Qxf5 exf5 a3Be7 Bg5 Be6 e3 c6/Nimzo-Indian/classical, Noa variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 Be7 Be3 O-O O-O Nxd4 Bxd4 b5/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 f3 Nc6 c4 e6 Nc3 Be7 Nc2 Ne3 Qb6 Be2 Rd8/Sicilian/Prins (Moscow) variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 O-O d5 Nxd4 Be7 c4 O-O cxd5 exd5/Queen's pawn game/
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Qc2 O-O Nf3 Re8 O-O Nf8/QGD/exchange, positional line
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 Nc6 g5 Nd7 Be3 h4 Nb6 f4 d5/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 d5 a3 Be7 cxd5 Nxd5 Nxd5 Qxd5 Nc3 Qd8/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 Bd7 Be3 e6 O-O a6 f4 Qc7 Kh1 Be7/Sicilian/classical
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 Be7 O-O-ONxd4 Qxd4 a6 h4/Sicilian/Richter-Rauzer, Rauzer attack, 7...Be7
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 d5 O-O c6 cxd5 cxd5 Ne5 Nbd7 Nc3 e6 f4 b6/Neo-Gruenfeld, 6.O-O, main line/
d4 Nf6 Nf3 d5 c4 e6 g3 Bb4+ Bd2 Be7 Bg2 O-O O-O c6 Qc2 b6 Bf4 Bb7 Nbd2 Nbd7/Queen's pawn game/
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 Qb6 Nb3 e6 g4 Be3 Qc7 g5 Nd7/Sicilian/Richter-Rauzer
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Ne2 Bg4 f3 Be6 Nbc3 Bd5 O-O e6/QGA/3.e4
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 c5 O-O Nc6 Qa4 cxd4 Nxd4 Qxd4 Bxc6+ Bd7 Rd1 Qxd1+/Catalan/open, 5.Nf3
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 b5 Be2 Bb7/QGD semi-Slav/Stoltz variation
d4 d5 c4 e6 Nf3 c6 Qc2 Nf6 g3 Bd6 Bg2 O-O O-O Nbd7 Nc3 dxc4 Nd2 Nb6 Nce4 Be7/Queen's gambit declined/
Nf3 d5 c4 d4 g3 Nc6 Bg2 e5 d3 Nf6 O-O Nd7 Na3 Be7 Nc2 a5 b3 O-O/Reti/advance variation
e4 c5 Nf3 Nc6 Bb5 g6 O-O Bg7 Na3 Nf6 Re1 O-O Bxc6 bxc6 e5 Nd5 d3 d6 Nc4 h6/Sicilian/Nimzovich-Rossolimo attack (with ...g6, without ...d6)
d4 f5 g3 Nf6 Bg2 d6 Nf3 g6 O-O Bg7 c4 O-O Nc3 Qe8 b3 c6 Ba3 h6 Qd3 g5/Dutch defence/
e4 c6 c4 d5 exd5 cxd5 d4 Nf6 Nc3 e6 Nf3 Be7 cxd5 Nxd5 Bb5+Bd7 Bxd7+ Qxd7 Ne5 Nxc3/Caro-Kann/Panov-Botvinnik attack, 5...e6
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 c4 Nf6 Nc3 Nxd4 Qxd4 d6 c5 Bg7 Bb5+ Bd7 cxd6 O-O/Sicilian/accelerated fianchetto, Gurgenidze variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 c5 d5 e6 Qd2 exd5 cxd5 Re8/King's Indian/Averbakh system
d4 f5 g3 Nf6 Bg2 d6 Nf3 g6 O-O Bg7 c4 O-O Nc3 Qe8 d5 Na6 Rb1 Nc5 Nd4 Bd7/Dutch defence/
e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nf6 Re1 Nc6 b3 e6 Bb2Be7 d4 cxd4 Nxd4 d5/Sicilian/Canal-Sokolsky attack, 3...Bd7
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 Be3 c6 Qd2 exd4 Nxd4 Re8 f3 d5/King's Indian/Gligoric-Taimanov system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nc6 Nc3 e6 Be3 Nf6 Be2 Be7 O-O Bd7 Ndb5 Qb8 a4 O-O/Sicilian/
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Nge2 Nb6/QGD/exchange, positional line
d4 Nf6 Nf3 b6 e3 Bb7 Bd3 e6 O-O c5 Nbd2 Nc6 c3 Qc7 dxc5 bxc5 e4 Be7/Queen's Indian defence/
e4 e5 d4 exd4 Qxd4 Nc6 Qe3 g6 Bd2 Bg7 Nc3 Nge7 Nd5 O-O O-O-O d6 Bc3 Nxd5 exd5 Re8/Centre game/Paulsen attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Nc6 Rg1 h5 g5 Ng4 Be2 g6/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 b6 O-O Bb7 a3 Be7 cxd5 exd5 b4 Nbd7/Nimzo-Indian/4.e3, main line with ...b6
d4 d5 c4 e6 Nf3 c6 cxd5 exd5 Nc3 Nf6 Qc2 Na6 Bg5 Be7 e3 Nc7 Bd3 Ne6 Bh4 g6/Queen's gambit declined/
d4 e6 Nf3 f5 g3 Nf6 Bg2 Be7 O-O O-O c4 d6 Nc3 a5 b3 Ne4 Bb2 Nxc3 Bxc3 Qe8/Dutch/classical variation
d4 Nf6 Nf3 g6 Bg5 Bg7 Nbd2 d6 e4 O-O c3 c5 dxc5 dxc5 Bc4 Nc6/King's Indian/Torre attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 a6 f4 Qc7 a4/Sicilian/Scheveningen (Paulsen), classical variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6 Qd2 a6 O-O-O Bd7 f4 Qc7 Nf3 h6/Sicilian/Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Qb6 Nb3 Nf6 Nc3 e6 Bd3 a6 O-O Be7 Kh1 O-O f4 d6/Sicilian defence/
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Bxc3+ Qxc3 Nxc5 b4Nce4 Qd4 d5 c5 b6/Nimzo-Indian/classical, 4...c5
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Bg5 c5 d5 a6 a4 h6 Be3e6 Qd2 exd5/King's Indian/Saemisch, 5...O-O
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nb3 Be7 Bg5 O-O Bxf6 Bxf6 Nd5 Bg5/Sicilian/Boleslavsky variation, 7.Nb3
d4 d5 c4 e6 Nf3 c6 Nc3 dxc4 g3/QGD/semi-Slav, Noteboom variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 cxd4 Nxd4 Nc6 Qd2 Nxd4 Bxd4 Qa5/King's Indian/Saemisch, 5...O-O
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 c5 Nge2 b6 d5 e6/King's Indian/Saemisch, 5...O-O
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 Nc6 O-O Rb8 Ne5/Catalan/open, 5.Nf3
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 d6 Be3 Nf6 f4 e5 Nf3 Qd2 Nxe3 Qxe3 exf4/Sicilian/Taimanov variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 e6 Bb3 a6 f4 Na5*/Sicilian/Sozin, Leonhardt variation
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be2 Bg7 Be3 d6 Qd2 h5 h3 Bd7 f4 Qa5/Sicilian/dragon, classical, Amsterdam variation
d4 d5 c4 e6 Nf3 Nf6 g3 Bb4+ Nbd2 O-O Bg2 b6 O-O Bb7 Ne5 Nbd7 Qa4 Bd6 Ndf3 c5/Queen's gambit declined/
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Bxd2+ Qxd2 O-O Nc3Ne4 Qd3 f5 O-O Nxc3/Queen's Indian/Capablanca variation
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nbd2 c5 dxc5 Bxc5 Be2 dxc4 Nxc4 Qxd1+ Bxd1 b6 Nfe5 Bb7/QGD Slav/
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 c5 Qe2 cxd4 exd4 Be7 O-O O-O Nc3 Nc6/QGA/classical variation
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 d3 d6 Nf3 f5 O-O Nf6/English/closed system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O O-O Ne4 Bd2 Qc2 Nxd2 Qxd2 d6/Queen's Indian/old main line, 7.Nc3
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Bd3 O-O Nf3 d5 O-O dxc4 Bxc4 Nc6 Bd3 cxd4 exd4 Be7/Nimzo-Indian/4.e3, Gligoric system with 7...dc
d4 Nf6 Nf3 d5 c4 c6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 Rd1 a6/QGD semi-Slav/Stoltz variation
e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 Bh6 Bxh6 Qxh6 b5 Bd3 Qa5 Nf3 b4 Ne2 Ba6/Pirc defence/
e4 e6 d3 d5 Qe2 Nf6 Nf3 Be7 g3 O-O Bg2 b5 O-O c5 e5 Nfd7/French/King's Indian attack
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 Qd2 e5 d5 Qe8 f3 Nh5 Bd3 f5/King's Indian/Averbakh system
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 c5 O-O O-O Bxb4 cxb4 Qd3 d5 Nbd2 dxc4/Queen's Indian/Capablanca variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 Na6 h4 e5 d5 h6 Be3 h5 f3 Nh7/King's Indian/Averbakh system
d4 Nf6 Nf3 d5 c4 e6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Rb8 Nfd2 Nxc4 b5 Ncd2 Bb7/Catalan/open, 5.Nf3
e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 e6 h3 Bxf3 Bxf3 c6 O-O dxe5 dxe5 Nd7 Qe2 Qc7/Alekhine's defence/modern variation, 4...Bg4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bg5 e6 Qd2 h6 Bxf6 gxf6 O-O-O a6 Be2 h5/Sicilian/Richter-Rauzer, Rauzer attack
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 Bg5 c5 c3 cxd4 Bxf6 gxf6/Queen's pawn game/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 cxd5 cxd5 Ne5 O-O Nfd7 f4 f6/King's Indian/fianchetto without c4
e4 c5 Nf3 a6 c3 d5 exd5 Qxd5 d4 e6 Be2 Nf6 O-O Nc6 Be3 cxd4 cxd4 Be7 Nc3 Qd8/Sicilian/O'Kelly variation
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Bc5 Qd3 Ne7/Ruy Lopez/open, Motzko attack, Nenarokov variation
d4 d5 c4 e6 Nf3 Nf6 g3 dxc4 Bg2 a6 O-O Nc6 e3 Rb8 Nfd2 Nxc4 b5 Ne5 c5 Bc6+/Catalan/open, 5.Nf3
c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 e3 d6 Nge2 f5 d4 e4/English/closed system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 Nc6 Bc4 O-O Qe2 Na5 Bd3 Nc6/Sicilian/dragon, Yugoslav attack
d4 d5 c4 e6 Nc3 c6 e3 f5 Bd3 Nf6 Nf3/QGD/semi-Slav
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 f4 Nbd7 Be2 Bg7 O-O O-O Kh1 a6 Bf3 Nb6/Sicilian/dragon, Levenfish; Flohr variation
d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 h6 Be3 e5 d5 c6 Qd2 h5 f3 a6/King's Indian/Averbakh system
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Nc3 Nbd7 Qc2 Bd6 Bd3 O-O O-O dxc4 Bxc4 Qe7 Rd1 c5/QGD semi-Slav/Stoltz variation
d4 Nf6 Nf3 e6 g3 c5 Bg2 cxd4 Nxd4 a6 O-O Qc7 Nb3 Be7 Bf4 d6 c4 Nbd7 Na3/Queen's pawn game/
d4 f5 g3 Nf6 Bg2 d6 Nf3 g6 b3 Bg7 O-O O-O Bb2 Qe8 c4 h6 Nc3 Na6 Re1 g5/Dutch defence/
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Be7 Rg1 d5 Bf4 Bb4/Sicilian/Scheveningen, Keres attack
d4 Nf6 c4 e6 Nc3 Bb4 e3 c5 Ne2 cxd4 exd4 d5 a3 Be7 Nf4 dxc4 Bxc4 O-O O-O Nc6/Nimzo-Indian/4.e3 c5, 5.Ne2 (Rubinstein)
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 f4 a6 Be2 Be7 O-O Kh1 Nc6 Nb3/Sicilian/Scheveningen, 6.f4
d4 d5 c4 dxc4 e4 Nf6 e5 Nd5 Bxc4 Nb6 Bd3 Nc6 Be3 Be6 Nc3 Bd5 Nf3 e6 O-O Bc4/QGA/3.e4
d4 f5 g3 Nf6 Bg2 e6 c4 Be7 Nf3 O-O O-O d6 Nc3 a5 Qc2 Nc6 e4 fxe4 Nxe4 e5/Dutch/classical variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 f4 e6 Qf3 Qb6 Nb3 Be3 Qc7 O-O-O b5/Sicilian/Najdorf, 6.f4
c4 e5 Nc3 d6 Nf3 f5 d4 e4 Bg5 Nf6 Nd2 h6 Bxf6 Qxf6/English opening/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Nbd2 Re8/Ruy Lopez/closed, anti-Marshall 8.a4
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d5 c4 c6 cxd5 Nxd5 Nc3 Nb6 h3 Be6 e4 Qd7/Neo-Gruenfeld, 6.O-O c6/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 d5 c4 dxc4 Na3 c3 bxc3 O-O O-O e3 Nc6 Qe2 Bf5/Neo-Gruenfeld, 5.Nf3/
e4 c5 Nc3 Nc6 f4 d6 Bb5 Bd7 Nf3 a6 Bxc6 Bxc6 O-O Nf6 d3 Qe1 Bg7 Bd2 Qd7/Sicilian/Grand Prix attack
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 d6 g4 h6 h4 Nc6 Rg1 h5 gxh5 Nxh5 Be3 e5/Sicilian/Scheveningen, Keres attack
e4 Nf6 e5 Nd5 d4 d6 Nf3 g6 Bc4 c6 O-O Bg7 h3 O-O Qe2 Bf5 Re1 dxe5 dxe5 Nd7/Alekhine's defence/modern, fianchetto variation
d4 Nf6 c4 d6 Nc3 e5 dxe5 dxe5 Qxd8+ Kxd8 Nf3 Nfd7/Old Indian/Ukrainian variation
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 b3 Nc6 Bb2 e5 dxe5 e4/King's Indian/fianchetto without c4
d4 d5 c4 dxc4 e4 e5 Nf3 Bb4+ Bd2 Bxd2+ Qxd2 exd4 Qxd4 Nf6 Qxd8+ Kxd8 Nc3 Be6 Ne5 Nc6/QGA/3.e4
d4 d5 c4 c6 Nf3 Nf6 e3 e6 Bd3 dxc4 Bxc4 a6 O-O c5 Bd3 Re1 b5 a4 bxa4/QGA/classical, 6...a6
d4 Nf6 Nf3 e6 Bf4 c5 c3 cxd4 cxd4 b5 e3 a6 Bd3 Bb7/Queen's pawn game/
e4 d6 d4 Nf6 Bd3 g6 c3 Bg7 Nf3 O-O O-O Nc6 Re1 e5 h3 Bd7 Be3 Re8 Nbd2 Nh5/King's pawn opening/
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Qc2 h6 Bh4 O-O Nge2 Re8/QGD/exchange, positional line
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 a6 g3 Qc7 Bg2 Nf6 O-O Be7 b3 O-O Bb2 Rd8/Sicilian/Taimanov variation
e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Ndb5 Bb4 a3 Bxc3+ Nxc3 d5 exd5 Nxd5 Bd2 O-O/Sicilian/Anderssen variation
d4 Nf6 Nf3 e6 g3 b5 Bg2 Bb7 O-O c5 c3 h6 a4 b4 a5 cxd4 cxd4 Be7 Nbd2 O-O/Queen's pawn game/
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O c4 c6 Nc3 d5 cxd5 cxd5 Ne5 O-O Nfd7 Nf3 Nc6/King's Indian/fianchetto without c4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5 Nxc6 bxc6 Qd3Be7 Qg3 O-O O-O Nd7/Sicilian/Boleslavsky, Louma variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Be2 e5 Nf3 Be7 O-O O-O Bg5 Be6 Qd2 Rc8/Sicilian/Boleslavsky variation
c4 c6 Nf3 d5 b3 Nf6 g3 Bf5 Bg2 e6 Bb2 Nbd7 O-O h6 d3 Be7 Nc3 O-O Qc2 Bh7 Rad1 Qc7 e4/English/London defensive system
d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 Bf4 Bg7 e4 O-O Nd2 Bg4 Be2 Bxe2/Benoni defence/
d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Be3 c5 Qd2 cxd4 cxd4 Nc6 Rd1 e6/Gruenfeld/exchange variation
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bc4 Qb6 Nb3 e6 O-O Be7 Kh1 O-O f4 Qc7/Sicilian/Sozin, Benko variation
d4 Nf6 c4 e6 Nc3 Bb4 Qc2 c5 dxc5 Na6 a3 Qa5 Bd2 Nxc5 Nf3 d6 Nb5 Bxd2+ Nxd2 Qb6/Nimzo-Indian/classical, 4...c5
e4 c5 Nf3 d6 d4 cxd4 Qxd4 Nc6 Bb5 Bd7 Bxc6 bxc6 O-O e5 Qd3Nf6 c4 Be7 Nc3 O-O/Sicilian, Chekhover variation/
d4 g6 c4 Bg7 Nf3 c5 e4 Nc6 d5 Nd4 Nxd4 Bxd4 Bd3 d6/Modern defence/
e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O a4 d3 d6 Nbd2 Qd7/Ruy Lopez/closed, anti-Marshall 8.a4
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Bc4 Qb6 Nb3 e6 O-O Be7 Kh1 O-O f4 a6/Sicilian/Sozin, Benko variation
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Bb4+ Bd2 Be7 Nc3 O-O O-O Na6 Bf4 d5 Ne5 c5/Queen's Indian/Riumin variation
c4 Nf6 Nc3 e6 Nf3 Bb4 a3 Bxc3 bxc3 c5 g3 Nc6 d3 d5 cxd5 exd5 Bg2 O-O/English/Nimzo-English opening
d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 c6 Bd3 Nbd7 Nge2 Nh5 Bxe7 Qxe7 Rb1 g6/QGD/exchange, positional line
d4 Nf6 Nf3 g6 g3 Bg7 Bg2 O-O O-O d6 Re1 Nbd7 e4 e5 dxe5 dxe5 Nbd2 Re8 Nc4 Qe7/King's Indian/fianchetto without c4
d4 d5 c4 dxc4 Nf3 a6 e3 e6 Bxc4 c5 O-O Nf6 Bd3 Nbd7 Qe2 Nc3 Bb7 Rd1 Qb8/QGA/classical, 6...a6
d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 Qe2 a6 dxc5 Bxc5 O-O Qc7 Nbd2 Nc6 Bd3/QGA/classical variation
d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Bg5 Ne4 cxd5 Nxg5 Nxg5 e6 Qd2 h6 Nh3 exd5 Nf4/Gruenfeld/5.Bg5
e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6 Nc3 Bg7 Be3 Nf6 Bc4 Qa5 O-O Ng4 Nb3 Qh5 Bf4 Be5/Sicilian/accelerated fianchetto, modern variation with Bc4
d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 O-O Qc2 d5 cxd5 exd5 O-O Na6 Rd1 Re8/Queen's Indian/anti-Queen's Indian system
e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bc4 e6 Bb3 Nbd7 Bg5 Qa5 Qd2 Be7 O-O-O Nc5/Sicilian/Najdorf, Lipnitzky attack
`;
var openingdata_default = moves;

// src/service/openings.service.ts
class San {
  san;
  info;
  children = [];
  constructor(san) {
    this.san = san;
  }
}

class OpeningsService {
  tree = [];
  constructor() {
    openingdata_default.split("\n").forEach((line) => {
      const parts = line.split("/");
      const san = this.create(parts[0].split(" "));
      san.info = parts[1] + "/" + parts[2];
    });
  }
  create = (moves2) => {
    let ch = this.tree;
    let san;
    moves2.forEach((move) => {
      san = ch.find((s5) => s5.san == move);
      if (san) {
        ch = san.children;
      } else {
        san = new San(move);
        ch.push(san);
        ch = san.children;
      }
    });
    return san;
  };
  locate = (moves2) => {
    let ch = this.tree;
    let san;
    for (const move of moves2) {
      san = ch.find((s5) => s5.san == move);
      if (san) {
        ch = san.children;
      } else {
        return;
      }
    }
    return san;
  };
  sanTextLocate = (moves2) => this.sanText(this.locate(moves2));
  sanText = (san) => {
    if (san && san.info)
      return san.info.replace(/\//, " - ");
    if (san && san.children.length)
      return this.sanText(san.children[0]);
    return "";
  };
}

// src/service/play.service.ts
var PROMOTE_BUTTONS = "";
var WINNER_BUTTONS = "";
var YESNO_BUTTONS2 = "";

class PlayService {
  static storage = "play";
  wtime = 0;
  btime = 0;
  log = [];
  fen = FEN.NEW_GAME;
  chess = new Chess(this.fen);
  date = Date.now();
  constructor() {
    this.isWhiteTurn = true;
    this.isComplete = false;
    this.allowed = 0;
    this.isPlaying = false;
    this.pgns = [];
    makeAutoObservable(this);
    const restore = storageService.restoreObject(PlayService.storage, {
      wtime: 0,
      btime: 0,
      log: [],
      fen: FEN.NEW_GAME
    });
    this.wtime = restore.wtime;
    this.btime = restore.btime;
    this.log = restore.log;
    this.fen = restore.fen;
    this.calculate();
  }
  store() {
    storageService.storeObject(PlayService.storage, this);
  }
  calculate() {
    const san = this.log[this.log.length - 1];
    this.chess = new Chess(this.fen);
    this.isComplete = rulesService.isEndMove(san) || this.chess.isGameOver();
    if (this.isComplete) {
      if (this.isPlaying) {
        mediaService.playWinner();
      }
      this.isPlaying = false;
    }
    this.clock = configService.clocks.find((p2) => p2.getName() == configService.clock) || new Clock("", []);
    this.allowed = this.clock.getAllowed(this.log.length / 2);
    this.isWhiteTurn = this.chess.turn() === WHITE;
    this.pgns = this.calculatePgns();
  }
  calculatePgns() {
    if (this.log.length == 0) {
      return this.getPGNS(openingsService.tree);
    }
    const pgn = openingsService.locate(this.log);
    return pgn ? this.getPGNS(pgn.children) : [];
  }
  getPGNS(sans) {
    try {
      const sqs = sans.filter((san) => san.san).map((san) => {
        return new Chess(this.fen).move(san.san);
      }).flatMap((move) => move ? [move.from, move.to] : []);
      return Array.from(new Set(sqs).values());
    } catch (error) {
      return [];
    }
  }
  isMoveable = (from) => this.chess.moves({ square: from }).length > 0;
  resetGameAction = () => {
    this.wtime = 0;
    this.btime = 0;
    this.log = [];
    this.fen = FEN.NEW_GAME;
    this.isWhiteTurn = true;
    this.isComplete = false;
    analyzerService.reset();
    this.run();
  };
  initBots() {
    const players = [...configService.humans, ...configService.bots];
    const w2 = players.find((p2) => p2.getName() == configService.white);
    this.wplayer = botService.instantiate(w2, this.wplayer);
    const b2 = players.find((p2) => p2.getName() == configService.black);
    this.bplayer = botService.instantiate(b2, this.bplayer);
  }
  addMove(san) {
    const prev = this.nextPlayer();
    if (prev instanceof Human)
      this.isPlaying = true;
    this.date = Date.now();
    this.log.push(san);
    analyzerService.reset();
    this.fen = rulesService.newFen(this.fen, san);
    if (this.isWhiteTurn) {
      this.wtime += clockService.elapsed;
    } else {
      this.btime += clockService.elapsed;
    }
    clockService.reset();
    this.run();
  }
  run() {
    clockService.reset();
    if (!this.wplayer) {
      this.initBots();
    }
    this.calculate();
    const next = this.nextPlayer();
    if (!(next instanceof BotRunner)) {
      analyzerService.run(this.fen, this.isWhiteTurn);
    }
    this.store();
    if (this.isPlaying) {
      this.runBot();
    }
  }
  runBot() {
    const next = this.nextPlayer();
    if (next instanceof BotRunner) {
      next.processFen(this.fen, ({ from, to }) => {
        const move = rulesService.move(this.fen, from, to);
        if (move) {
          this.playMove(move[1].san);
        }
      });
    }
  }
  nextPlayer = () => this.isWhiteTurn ? this.wplayer : this.bplayer;
  playMove(san) {
    this.addMove(san);
    this.store();
    if (this.isComplete) {
      historyService.storeGame();
    }
    this.playContinue();
  }
  recordScore(yes) {
    if (yes.startsWith("White")) {
      this.playMove("1-0");
    } else if (yes.startsWith("Black")) {
      this.playMove("0-1");
    } else if (yes == "Draw") {
      this.playMove("1/2-1/2");
    }
    messageService.clear();
  }
  outOfTime() {
    this.playMove(this.isWhiteTurn ? "1-0" : "0-1");
    this.isPlaying = false;
  }
  playContinue() {
    this.isPlaying = true;
    this.runBot();
  }
  whoWon = () => rulesService.whoWon(this.log);
  setPlaying(play) {
    this.isPlaying = play;
    if (play) {
      this.runBot();
    }
  }
  initGame(useLog) {
    this.log = useLog;
    this.fen = rulesService.replay(this.log);
    this.clearAnalyzer();
  }
  undoTo(mark) {
    this.setPlaying(false);
    dashboardService.setMarkLog(mark);
    const pos = mark >= 0 ? mark : this.log.length;
    this.fen = rulesService.replay(this.log, pos);
    this.clearAnalyzer();
  }
  clearAnalyzer() {
    refreshService.startRefreshTimer();
    analyzerService.cp = 0;
    analyzerService.help = [];
  }
  loadGame() {
    const games = historyService.history;
    const moves2 = games[historyService.markHist].split(";")[5].split(" ");
    this.log = moves2;
    const mark = moves2.length - 1;
    dashboardService.setMarkLog(mark);
    this.fen = rulesService.replay(moves2, mark);
  }
  startGameAction = () => {
    configService.store();
    configService.closeConfigAction();
    configService.showConfig = false;
    this.playContinue();
  };
  editGameAction = () => {
    configService.store();
    editService.editStart(this.fen);
  };
  endGameAction = () => {
    const winner = this.whoWon();
    if (winner) {
      messageService.display("Game has ended", winner != "Draw" ? winner + " won this game" : "The game was a draw");
    } else {
      const white = configService.white.split(" ")[0];
      const black = configService.black.split(" ")[0];
      messageService.display("End game", "Who won", WINNER_BUTTONS(black, white), this.recordScore);
    }
  };
  onDragStartAction = (piece, from) => {
    const r90 = configService.rotation % 2 == 1;
    if (editService.showEdit)
      return true;
    const player = this.nextPlayer();
    if (player instanceof Human && !this.isComplete) {
      const from2 = r90 ? rulesService.leftSquare(from) : from;
      const movable = this.isMoveable(from2);
      if (movable) {
        mediaService.sound_click.play().then();
      }
      return movable;
    }
    return false;
  };
  onPieceDropAction = (from, to) => {
    if (editService.showEdit) {
      editService.editMove(from, to);
      return true;
    }
    const r90 = configService.rotation % 2 == 1;
    if (analyzerService.help.length > 1 && analyzerService.help[0] == to && analyzerService.help[1] == from) {
      mediaService.playCorrect();
    }
    dashboardService.startUndoTimer(this.log.length);
    const state2 = this.log.length;
    const m1 = r90 ? rulesService.leftSquare(from) : from;
    const m2 = r90 ? rulesService.leftSquare(to) : to;
    this.move(m1, m2, true);
    state2 != this.log.length ? mediaService.soundMove() : mediaService.soundError();
    return true;
  };
  move(from, to, isHuman) {
    const move = rulesService.move(this.fen, from, to);
    if (!move) {
      return;
    }
    if (this.isPlaying || isHuman) {
      const action2 = move[1];
      if (action2.promotion && isHuman) {
        messageService.display("Promotion", "Choose promotion piece", PROMOTE_BUTTONS, (reply) => {
          let promo = "q";
          if (reply == "Rook")
            promo = "r";
          if (reply == "Knight")
            promo = "n";
          if (reply == "Bishop")
            promo = "b";
          const move2 = rulesService.move(this.fen, from, to, promo);
          if (move2 != null) {
            messageService.clear();
            this.playMove(move2[1].san);
          }
        });
      } else {
        this.playMove(action2.san);
      }
    }
  }
  onSquareClickAction = (square) => editService.onSquareClick(square);
  markEdit(func) {
    if (editService.showEdit && editService.editSquare != "")
      func();
  }
  markFacts(func) {
    if (configService.showFacts) {
      this.pgns.forEach((x2) => func(x2));
    }
  }
  markHints(func) {
    if (configService.showFacts) {
      analyzerService.help.forEach((x2, i7) => func(x2, i7));
    }
  }
  markCastling(func) {
    rulesService.getCastlingSquares(this.fen).forEach((x2) => func(x2));
  }
  playButtonAction = () => {
    const isHistUndo = !dashboardService.showHist && dashboardService.markLog >= 0;
    const isPlayUndo = this.isPlaying && dashboardService.showUndo;
    if (this.isComplete)
      this.resetGameAction();
    if (isHistUndo || isPlayUndo) {
      messageService.display("Undo", isPlayUndo ? "Do you want to undo last move?" : "Do you want to revert the game to the marked position?", YESNO_BUTTONS2, (yes) => {
        messageService.clear();
        if (yes == "Yes") {
          this.initGame(this.log.slice(0, isPlayUndo ? dashboardService.undopos : dashboardService.markLog));
        }
        dashboardService.setMarkLog(-1);
      });
      return;
    }
    this.setPlaying(!this.isPlaying);
  };
  getStartTime = () => Math.floor(this.isWhiteTurn ? this.wtime : this.btime);
  getPlayerInfo(isTop) {
    const isWhite = isTop == configService.rotation > 1;
    const otherTime = isWhite ? this.wtime : this.btime;
    return {
      other: toMMSS(this.allowed ? this.allowed - otherTime : otherTime),
      label: isWhite ? `White: ${configService.white}` : `Black: ${configService.black}`,
      showTicker: isWhite == this.isWhiteTurn,
      banner: isWhite != this.isWhiteTurn && this.isComplete ? " ** Winner **" : "",
      isTextRight: isTop && configService.rotation % 2 == 1
    };
  }
}
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "isWhiteTurn", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "isComplete", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "bplayer", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "wplayer", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "clock", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "allowed", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "isPlaying", 2);
__decorateClass([
  $jsonIgnore()
], PlayService.prototype, "pgns", 2);

// src/service/storage.service.ts
class StorageService {
  storeLines = (name, lines) => {
    return localStorage.setItem(name, lines.join("\n") ?? []);
  };
  restoreLines = (name, init) => {
    try {
      return localStorage.getItem(name)?.replace(/\r/, "").split("\n") ?? init;
    } catch (error) {
      messageService.display("Storage error " + name, String(error));
      return init;
    }
  };
  storeObject = (name, obj) => {
    return localStorage.setItem(name, JSON.stringify(obj, $jsonIgnoreReplacer));
  };
  restoreObject = (name, init) => {
    try {
      const data = localStorage.getItem(name);
      return data ? JSON.parse(data) : init;
    } catch (error) {
      messageService.display("Storage error " + name, String(error));
      return init;
    }
  };
}

// src/service/rendering.service.ts
class RenderingService {
  darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  iPad = navigator.userAgent.includes("(iPad;");
  boardWidth = 680;
  height = 748;
  constructor() {
    makeAutoObservable(this);
  }
}

// src/service/refresh.service.ts
class RefreshService {
  showBlank = false;
  constructor() {
    makeAutoObservable(this);
  }
  refreshTimer = () => {
    this.showBlank = false;
  };
  startRefreshTimer() {
    this.showBlank = true;
    window.setTimeout(this.refreshTimer, 100);
  }
}

// src/service/clock.service.ts
class ClockService {
  elapsed = 0;
  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.update(playService.isPlaying);
    }, 1000);
  }
  update(isPlaying) {
    isPlaying ? this.elapsed++ : this.elapsed;
  }
  reset() {
    this.elapsed = 0;
  }
  get clockText() {
    const current = Math.floor(this.elapsed) + playService.getStartTime();
    const allowed = playService.allowed;
    if (!allowed) {
      return current;
    }
    const remains = allowed - current;
    if (remains < 11) {
      mediaService.soundClick();
    }
    if (remains < 0) {
      mediaService.soundError();
      playService.outOfTime();
    }
    return toMMSS(allowed - current);
  }
}

// src/service/edit.service.ts
class EditService {
  showEdit = false;
  editSquare = "";
  editFen = "";
  wcck = false;
  wccq = false;
  bcck = false;
  bccq = false;
  bFirst = false;
  constructor() {
    this.boolprops = new Map([
      ["wcck", { get: () => this.wcck, set: (value) => this.wcck = value }],
      ["wccq", { get: () => this.wccq, set: (value) => this.wccq = value }],
      ["bcck", { get: () => this.bcck, set: (value) => this.bcck = value }],
      ["bccq", { get: () => this.bccq, set: (value) => this.bccq = value }],
      ["bFirst", { get: () => this.bFirst, set: (value) => this.bFirst = value }]
    ]);
    makeAutoObservable(this);
  }
  editStart(fen5) {
    this.showEdit = true;
    this.editFen = fen5;
    configService.showConfig = false;
  }
  editDoneAction = () => {
    const fenArr = this.editFen.split(" ");
    fenArr[1] = this.bFirst ? BLACK : WHITE;
    fenArr[2] = (this.wcck ? "K" : "") + (this.wccq ? "Q" : "") + (this.bcck ? "k" : "") + (this.bccq ? "q" : "");
    const fen5 = fenArr.join(" ");
    this.editFen = fen5;
    this.showEdit = false;
    playService.fen = fen5;
    configService.showConfig = true;
  };
  editPiece = (piece) => {
    const fenArr = this.editFen.split(" ");
    const brd = FEN.fen2brd(this.editFen).split("");
    const p2 = SQUARES.indexOf(this.editSquare);
    brd[p2] = piece;
    fenArr[0] = FEN.brd2fen(brd.join(""));
    const fen5 = fenArr.join(" ");
    this.editFen = fen5;
  };
  editMove(from, to) {
    const fenArr = this.editFen.split(" ");
    const brd = FEN.fen2brd(this.editFen).split("");
    const p1 = SQUARES.indexOf(from);
    const p2 = SQUARES.indexOf(to);
    const swap = brd[p1];
    brd[p1] = brd[p2];
    brd[p2] = swap;
    fenArr[0] = FEN.brd2fen(brd.join(""));
    const fen5 = fenArr.join(" ");
    this.editFen = fen5;
  }
  onSquareClick(square) {
    if (this.showEdit) {
      this.editSquare = square;
    }
  }
}
__decorateClass([
  $jsonIgnore()
], EditService.prototype, "boolprops", 2);

// src/service/index.service.ts
var messageService = new MessageService;
var storageService = new StorageService;
var utilService = new UtilService;
var configService = new ConfigService;
var mediaService = new MediaService;
var rulesService = new RulesService;
var openingsService = new OpeningsService;
var connectService = new ConnectService;
var historyService = new HistoryService;
var dashboardService = new DashboardService;
var botService = new BotService;
var playService = new PlayService;
var editService = new EditService;
var analyzerService = new AnalyzerService;
var renderingService = new RenderingService;
var bluetoothService2 = new BluetoothService;
var refreshService = new RefreshService;
var clockService = new ClockService;

// node_modules/@adobe/lit-mobx/lib/mixin-custom.js
function MobxReactionUpdateCustom(constructor, ReactionConstructor) {
  var _a2, _b;
  return _b = class MobxReactingElement extends constructor {
    constructor() {
      super(...arguments);
      this[_a2] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const name = this.constructor.name || this.nodeName;
      this[reaction] = new ReactionConstructor(`${name}.update()`, this[cachedRequestUpdate]);
      if (this.hasUpdated)
        this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this[reaction]) {
        this[reaction].dispose();
        this[reaction] = undefined;
      }
    }
    update(changedProperties) {
      if (this[reaction]) {
        this[reaction].track(super.update.bind(this, changedProperties));
      } else {
        super.update(changedProperties);
      }
    }
  }, _a2 = cachedRequestUpdate, _b;
}
var reaction = Symbol("LitMobxRenderReaction");
var cachedRequestUpdate = Symbol("LitMobxRequestUpdate");

// node_modules/@adobe/lit-mobx/lib/mixin.js
function MobxReactionUpdate(constructor) {
  return MobxReactionUpdateCustom(constructor, Reaction);
}

// node_modules/@adobe/lit-mobx/lit-mobx.js
class MobxLitElement extends MobxReactionUpdate(s4) {
}

// src/components/mainbuttonbar.ts
class MainButtonBar extends MobxLitElement {
  constructor() {
    super(...arguments);
  }
  edit;
  dashboard;
  history;
  render() {
    new MdTabs;
    new MdPrimaryTab;
    const isGotoHist = this.dashboard.showHist && this.history.markHist >= 0;
    const isHistUndo = !this.dashboard.showHist && this.dashboard.markLog >= 0;
    const isPlayUndo = playService.isPlaying && this.dashboard.showUndo;
    const button1 = isHistUndo || isPlayUndo ? "undo" : playService.isPlaying ? "play_arrow" : "pause";
    const button2 = isGotoHist ? this.edit.showEdit ? "input" : "edit" : this.dashboard.showHist ? "folder_open" : "history";
    return x`
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      <style>
        @font-face {
          font-family: "Material Design Icons";
          src: url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined") format("woff");
        }
        span {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        md-tabs {
          width: 100%;
        }
      </style>
      <md-tabs color="primary" aria-label="outlined primary button group" className="w-full">
        <md-primary-tab @click=${action(playService.playButtonAction)}>
          <span class="material-symbols-outlined">${button1}</span>
        </md-primary-tab>
        <md-primary-tab @click=${action(this.dashboard.toggleHistoryAction)}>
          <span class="material-symbols-outlined">${button2}</span>
        </md-primary-tab>
        <md-primary-tab @click=${action(configService.openConfigAction)}>
          <span class="material-symbols-outlined">settings</span>
        </md-primary-tab>
      </md-tabs>
    `;
  }
}
MainButtonBar = __decorateClass([
  e4("cb-mainbuttonbar")
], MainButtonBar);
// package.json
var package_default = {
  name: "chessbuddy",
  version: "0.22.0",
  homepage: ".",
  dependencies: {
    "@adobe/lit-mobx": "^2.2.0",
    "@material/web": "^1.0.0",
    "@types/audio-play": "^2.3.1",
    "chess.js": "^1.0.0-beta.6",
    "chessboard-element": "^1.2.0",
    "json-ignore": "^0.4.0",
    "lit-element": "^4.0.0",
    mobx: "^6.10.2",
    "react-icons": "^4.11.0"
  },
  scripts: {
    start: "bun run src/index.ts",
    dev: "bunx --bun vite src/index.ts",
    dev2: "bun --hot src/index.ts",
    prod: "bun build ./src/index.ts --outfile=./public/bundle.js --watch"
  },
  devDependencies: {
    "@types/webaudioapi": "^0.0.27",
    "@types/web": "^0.0.118",
    "bun-types": "latest"
  },
  peerDependencies: {
    typescript: "^5.2.2"
  }
};

// src/components/mainview.ts
class MainView extends MobxLitElement {
  constructor() {
    super(...arguments);
  }
  edit;
  dashboard;
  render() {
    if (this.edit.showEdit) {
      new MainEditView;
      return x`<cb-maineditview .edit=${this.edit} />`;
    }
    if (this.dashboard.showHist) {
      new MainHistoryView;
      return x`<cb-mainhistoryview .history=${historyService} />`;
    }
    new MainLogView;
    return x`<cb-mainlogview .play=${playService} .history=${historyService} />`;
  }
}
MainView = __decorateClass([
  e4("cb-mainview")
], MainView);

class MainEditView extends s4 {
  constructor() {
    super(...arguments);
  }
  render() {
    return x`<div>Edit </div>`;
  }
}
MainEditView = __decorateClass([
  e4("cb-maineditview")
], MainEditView);

class MainHistoryView extends s4 {
  constructor() {
    super(...arguments);
  }
  render() {
    return x`<div>History </div>`;
  }
}
MainHistoryView = __decorateClass([
  e4("cb-mainhistoryview")
], MainHistoryView);

class MainLogView extends s4 {
  constructor() {
    super(...arguments);
  }
  render() {
    return x`<div>Log </div>`;
  }
}
MainLogView = __decorateClass([
  e4("cb-mainlogview")
], MainLogView);

// src/components/app.ts
class App extends s4 {
  constructor() {
    super(...arguments);
  }
  render() {
    new Board;
    new MainButtonBar;
    new MainView;
    return x`
    <style> 
    .main {
      width: 1024px;
      height: 748px;
      --tw-bg-opacity: 1;
      background-color: rgb(220 252 231 / var(--tw-bg-opacity));
      :is(.dark .dark\:bg-green-900) {
        --tw-bg-opacity: 1;
        background-color: rgb(20 83 45 / var(--tw-bg-opacity));
      }
      border-width: 0px;
      display: flex;
      flex-direction: row;
      margin: 0px;
      padding: 0px;
    }
    .board {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .panel {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;
    }
    .panel2 {
      display: flex;
      flex-direction: row;
      height: 2rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      :is(.dark .dark\:text-white) {
        --tw-text-opacity: 1;
        color: rgb(255 255 255 / var(--tw-text-opacity));
      }
    }
    .panel3 {
      margin-left: 1.25rem;
      margin-right: 1.25rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    .panel4 {
      margin-left: 1.25rem;
      margin-right: 1.25rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  </style>
    <div class="main">
      <div class="CP" analyzer={analyzerService} config={configService} ></div>
      <div class="board">
        <div class="PlayerInfoBar" isTop={true} play={playService} ></div>
        <cb-board
          analyzer={analyzerService}
          edit={editService}
          rendering={rendering}
          config={configService}
          refresh={refreshService}
          ></cb-board>
          <div class="PlayerInfoBar" isTop={false} play={playService} ></div>
      </div>
      <div class="panel">
        <h3 class="panel2">
          <span onClick={action(about)}  class="panel3">
            ChessBuddy ${package_default.version}
          </span>
          <div class="MdRefresh panel4" onClick={action(mediaService.playAllAction)} ></div>
        </h3>
        <cb-mainbuttonbar
          .edit=${editService}
          .dashboard=${dashboardService}
          .history=${historyService}
          ></cb-mainbuttonbar>
        <div class="FenInfo" play={playService} ></div>
        <cb-mainview .dashboard=${dashboardService} .edit=${editService} ></cb-mainview>
      </div>
      <div class="MessageDialog" message={messageService} ></div>
      <div class="Mp4Dialog" mp4={mediaService} ></div>
      <div class="ConfigDialog" config={configService} ></div>
    `;
  }
}
App = __decorateClass([
  e4("cb-app")
], App);

// src/index.ts
new App;
document.getElementById("root").innerHTML = "<cb-app></cb-app>";

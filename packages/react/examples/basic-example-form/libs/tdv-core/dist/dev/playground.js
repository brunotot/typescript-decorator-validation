var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { attribute } from "../collection/class/attribute";
import collection from "../collection/index";
import { ValidationEngine } from "../src/validation/models/ValidationEngine";
let AddressForm = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _street_decorators;
    let _street_initializers = [];
    let _city_decorators;
    let _city_initializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _zipCode_decorators;
    let _zipCode_initializers = [];
    return _a = class AddressForm {
            constructor() {
                this.street = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _street_initializers, void 0));
                this.city = __runInitializers(this, _city_initializers, void 0);
                this.state = __runInitializers(this, _state_initializers, void 0);
                this.zipCode = __runInitializers(this, _zipCode_initializers, void 0);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _street_decorators = [collection.any.Required()];
            _city_decorators = [collection.any.Required()];
            _state_decorators = [collection.string.Alpha()];
            _zipCode_decorators = [collection.any.Required()];
            __esDecorate(null, null, _street_decorators, { kind: "field", name: "street", static: false, private: false, access: { has: obj => "street" in obj, get: obj => obj.street, set: (obj, value) => { obj.street = value; } }, metadata: _metadata }, _street_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _zipCode_decorators, { kind: "field", name: "zipCode", static: false, private: false, access: { has: obj => "zipCode" in obj, get: obj => obj.zipCode, set: (obj, value) => { obj.zipCode = value; } }, metadata: _metadata }, _zipCode_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
let EducationForm = (() => {
    let _classDecorators = [collection.clazz.ValidDateRange("graduationStartDate", "graduationEndDate")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _degree_decorators;
    let _degree_initializers = [];
    let _fieldOfStudy_decorators;
    let _fieldOfStudy_initializers = [];
    let _university_decorators;
    let _university_initializers = [];
    var EducationForm = _classThis = class {
        constructor() {
            this.degree = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _degree_initializers, void 0));
            this.fieldOfStudy = __runInitializers(this, _fieldOfStudy_initializers, void 0);
            this.university = __runInitializers(this, _university_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "EducationForm");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _degree_decorators = [collection.any.Required()];
        _fieldOfStudy_decorators = [collection.any.Required()];
        _university_decorators = [collection.any.Required()];
        __esDecorate(null, null, _degree_decorators, { kind: "field", name: "degree", static: false, private: false, access: { has: obj => "degree" in obj, get: obj => obj.degree, set: (obj, value) => { obj.degree = value; } }, metadata: _metadata }, _degree_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _fieldOfStudy_decorators, { kind: "field", name: "fieldOfStudy", static: false, private: false, access: { has: obj => "fieldOfStudy" in obj, get: obj => obj.fieldOfStudy, set: (obj, value) => { obj.fieldOfStudy = value; } }, metadata: _metadata }, _fieldOfStudy_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _university_decorators, { kind: "field", name: "university", static: false, private: false, access: { has: obj => "university" in obj, get: obj => obj.university, set: (obj, value) => { obj.university = value; } }, metadata: _metadata }, _university_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EducationForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EducationForm = _classThis;
})();
let JobApplicationForm = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _fullName_decorators;
    let _fullName_initializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _phoneNumber_decorators;
    let _phoneNumber_initializers = [];
    let _dateOfBirth_decorators;
    let _dateOfBirth_initializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _educations_decorators;
    let _educations_initializers = [];
    let _skills_decorators;
    let _skills_initializers = [];
    let _coverLetter_decorators;
    let _coverLetter_initializers = [];
    return _a = class JobApplicationForm {
            constructor() {
                this.fullName = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _fullName_initializers, void 0));
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.phoneNumber = __runInitializers(this, _phoneNumber_initializers, void 0);
                this.dateOfBirth = __runInitializers(this, _dateOfBirth_initializers, void 0);
                this.address = __runInitializers(this, _address_initializers, void 0);
                this.educations = __runInitializers(this, _educations_initializers, []);
                this.skills = __runInitializers(this, _skills_initializers, void 0);
                this.coverLetter = __runInitializers(this, _coverLetter_initializers, void 0);
            }
            isCompoundValid() {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            var _b;
                            resolve({
                                key: "",
                                message: "Full name must be minimally 8 characters long.",
                                valid: ((_b = this.fullName) === null || _b === void 0 ? void 0 : _b.length) > 8,
                            });
                        }, 3000);
                    });
                });
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fullName_decorators = [collection.any.Required(), collection.string.Alpha()];
            _email_decorators = [collection.any.Required(), collection.string.Email()];
            _phoneNumber_decorators = [collection.any.Required()];
            _dateOfBirth_decorators = [collection.date.PastDate()];
            _address_decorators = [attribute(AddressForm)];
            _educations_decorators = [collection.array.ArraySizeMin(1), attribute(EducationForm)];
            _skills_decorators = [collection.any.Required(), collection.array.ArraySizeMin(1)];
            _coverLetter_decorators = [collection.any.Required()];
            __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: obj => "fullName" in obj, get: obj => obj.fullName, set: (obj, value) => { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: obj => "phoneNumber" in obj, get: obj => obj.phoneNumber, set: (obj, value) => { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: obj => "dateOfBirth" in obj, get: obj => obj.dateOfBirth, set: (obj, value) => { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _educations_decorators, { kind: "field", name: "educations", static: false, private: false, access: { has: obj => "educations" in obj, get: obj => obj.educations, set: (obj, value) => { obj.educations = value; } }, metadata: _metadata }, _educations_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _skills_decorators, { kind: "field", name: "skills", static: false, private: false, access: { has: obj => "skills" in obj, get: obj => obj.skills, set: (obj, value) => { obj.skills = value; } }, metadata: _metadata }, _skills_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _coverLetter_decorators, { kind: "field", name: "coverLetter", static: false, private: false, access: { has: obj => "coverLetter" in obj, get: obj => obj.coverLetter, set: (obj, value) => { obj.coverLetter = value; } }, metadata: _metadata }, _coverLetter_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
const jobApplicationForm = {
    fullName: "Bruno123", // Alpha validation will fail
    email: "bruno-email", // Email validation will fail
    phoneNumber: "+38512345678",
    dateOfBirth: new Date("2090-05-15"), // PastDate validation will fail
    address: {
        street: "123 Main St",
        city: "Zagreb",
        state: "HR1", // Alpha validation will fail
        zipCode: "10000",
    },
    educations: [
        {
            degree: "",
            fieldOfStudy: "fieldOfStudy",
            graduationStartDate: new Date( /*"2023-09-01"*/),
            graduationEndDate: new Date( /*"2023-09-02"*/),
            university: "university",
        },
    ], // ArraySizeMin validation will fail
    skills: ["Java", "React", "TypeScript"],
    portfolioURL: "https://github.com/bruno",
    coverLetter: "I'm passionate about coding...",
};
const engine = new ValidationEngine(JobApplicationForm);
/*engine.registerAsync(({ detailedErrors, errors }) => {
  console.log(errors);
});*/
const result = engine.validate(jobApplicationForm);
console.log(result.errors.isCompoundValid);
//debugger;

import { decorate, ValidationEngine } from "tdv-core";
import ClassValidatorService from "../src/reflection/service/impl/ClassValidatorMetaService";
import ValidDateRange from "../validators/class/ValidDateRange";

class AddressForm {
  @decorate.any.Required()
  street!: string;

  @decorate.any.Required()
  city!: string;

  @decorate.string.Alpha()
  state!: string;

  @decorate.any.Required()
  zipCode!: string;
}

@ValidDateRange("graduationStartDate", "graduationEndDate")
class EducationForm {
  @decorate.any.Required()
  degree!: string;

  @decorate.any.Required()
  fieldOfStudy!: string;

  @decorate.any.Required()
  university!: string;

  graduationStartDate!: Date;

  graduationEndDate!: Date;
}

class JobApplicationForm {
  @decorate.any.Required()
  @decorate.string.Alpha()
  fullName!: string;

  @decorate.any.Required()
  @decorate.string.Email()
  email!: string;

  @decorate.any.Required()
  phoneNumber!: string;

  @decorate.date.PastDate()
  dateOfBirth!: Date;

  @decorate.any.Required()
  @decorate.nested.valid(AddressForm)
  address!: AddressForm;

  @decorate.any.Required()
  @decorate.array.ArraySizeMin(1)
  educations!: EducationForm[];

  @decorate.any.Required()
  @decorate.array.ArraySizeMin(1)
  skills!: string[];

  portfolioURL?: string;

  @decorate.any.Required()
  coverLetter!: string;
}

const jobApplicationForm: JobApplicationForm = {
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
  educations: [], // ArraySizeMin validation will fail
  skills: ["Java", "React", "TypeScript"],
  portfolioURL: "https://github.com/bruno",
  coverLetter: "I'm passionate about coding...",
};

// @valid !!!
// also add for nested

const engine = new ValidationEngine(JobApplicationForm);
const result = engine.validate(jobApplicationForm);
//console.log(JSON.stringify(result.errors, null, 2));

const classValidatorService = ClassValidatorService.inject(EducationForm);
console.log(classValidatorService);
debugger;

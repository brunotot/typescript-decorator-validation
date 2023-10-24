import { attribute } from "../collection/class/attribute";
import collection from "../collection/index";
import Objects from "../src/utilities/impl/Objects";
import Validation from "../src/validation/index";
import { ValidationEngine } from "../src/validation/models/ValidationEngine";

class AddressForm {
  @collection.any.Required()
  street!: string;

  @collection.any.Required()
  city!: string;

  @collection.string.Alpha()
  state!: string;

  @collection.any.Required()
  zipCode!: string;
}

@collection.clazz.ValidDateRange("graduationStartDate", "graduationEndDate")
class EducationForm {
  @collection.any.Required()
  degree!: string;

  @collection.any.Required()
  fieldOfStudy!: string;

  @collection.any.Required()
  university!: string;

  graduationStartDate!: Date;

  graduationEndDate!: Date;
}

class JobApplicationForm {
  @collection.any.Required()
  @collection.string.Alpha()
  fullName!: string;

  @collection.any.Required()
  @collection.string.Email()
  email!: string;

  @collection.any.Required()
  phoneNumber!: string;

  @collection.date.PastDate()
  dateOfBirth!: Date;

  @attribute(AddressForm)
  address!: AddressForm;

  @collection.array.ArraySizeMin(1)
  @attribute(EducationForm)
  educations: EducationForm[] = [];

  @collection.any.Required()
  @collection.array.ArraySizeMin(1)
  skills!: string[];

  portfolioURL?: string;

  @collection.any.Required()
  coverLetter!: string;

  async isCompoundValid(): Promise<Validation.Result> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          key: "",
          message: "Full name must be minimally 8 characters long.",
          valid: this.fullName?.length > 8,
        });
      }, 3000);
    });
  }
}

const jobApplicationForm: Objects.Payload<JobApplicationForm> = {
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
      graduationStartDate: new Date(/*"2023-09-01"*/),
      graduationEndDate: new Date(/*"2023-09-02"*/),
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

import MistEngineDataModel from "./base-model.mjs";

export default class MistEngineActorBase extends MistEngineDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.base = new fields.SchemaField({
      type: new fields.StringField({
        required: true,
        blank: false,
        options: ["Character", "Challenge"],
        initial: "Character"
      }),
      description: new fields.StringField({
        required: false,
        blank: true
      })
    })
    
    schema.health = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 })
    });
    schema.power = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 5 })
    });
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}
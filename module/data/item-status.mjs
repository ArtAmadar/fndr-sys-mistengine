import MistEngineItemBase from "./base-item.mjs";

export default class MistEngineStatus extends MistEngineItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.maxTier = new fields.NumberField({
        required: true,
        integer: true,
        min: 1,
        initial: 6
    }),
    schema.tiers = new fields.ArrayField(
        new fields.BooleanField(),
        {
            initial: Array(this.maxTier).fill(false),
            validate: tiers => tiers.lengts === this.maxTier
        }
    )
    return schema;
  }

  // Getter for maxTier
  get maxTier() {
    return this.getAttribute('maxTier');
  }

  // Setter for maxTier with additional logic
  set maxTier(value) {
    this.setAttribute('maxTier', value);
    this._adjustStatusMaxTiers();
  }

   _adjustStatusMaxTiers() {
    const currentLength = this.tiers.length;
    const newMax = this.maxTier;

    if (newMax > currentLength) {
        // Extend the array with false values
        this.tiers = this.tiers.concat(Array(newMax - currentLength).fill(false));
    } else if (newMax < currentLength) {
        // Truncate the array to the new maxTier
        this.tiers.length = newMax;
    }
  }


  /**
   * Mark a specific tier tier. If the tier is already marked, find the next available unmarked tier.
   * @param {number} tier - The tier tier to mark (1-based index).
   * @throws {Error} If the tier is out of bounds.
   */
  markTier(tier) {
    if (tier < 1 || tier > this.maxTier) {
      throw new Error(`Tier ${tier} is out of bounds. Must be between 1 and ${this.maxTier}.`);
    }

    const index = tier - 1; // Convert to 0-based index

    if (this.tiers[index]) {
      // If the specified tier is already marked, find the next unmarked tier
      for (let i = index + 1; i < this.maxTier; i++) {
        if (!this.tiers[i]) {
          this.tiers[i] = true;
          return;
        }
      }
      // WHAT TO DO IF I REACH MAX?
      // If all tiers are marked, you may choose to handle this case differently
      throw new Error('All tiers are already marked.');
    } else {
      // Mark the specified tier
      this.tiers[index] = true;
    }
  }

  unmarkTier(steps){
    if (steps < 1) {
        throw new Error(`Invalid number of steps: ${steps}. Must be a positive integer.`);
    }
    
    // Create a new array initialized with FALSE
    const newTiers = Array(this.maxTier).fill(false);

    // Shift marked tiers to the left by the specified number of steps
    for (let i = 0; i < length; i++) {
        if (tiers[i]) {
            const newIndex = i - steps;
            if (newIndex >= 0) {
                newTiers[newIndex] = true;
            }
            // If new index is negative, the mark is discarded
        }
    }

    // Update the tiers array
    this.tiers = newTiers;

  }
}
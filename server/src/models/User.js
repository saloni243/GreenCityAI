
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
    },

    phone: {
  type: String,
  trim: true,
  default: "",
  maxlength: 20,
},

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    tokenVersion: {
  type: Number,
  default: 0,
},

    role: {
      type: String,
      enum: [
        "super_admin",
        "environmental_officer",
        "city_analyst",
        "viewer",
      ],
      default: "viewer",
    },

    

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
  
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Verify password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

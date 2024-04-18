"use client";
import SecondaryHero from "@/components/SecondaryHero";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { CustomButton } from "@/components";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  // Shows alert message for form submission feedback
  const toggleAlert = (message: string, type: string) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Data", name, email, subject, message);
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      await emailjs
        .send("service_arw2aoc", "template_9drx1pa", templateParams, {
          publicKey: "tf2HxHONrrud2sJAF",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );

      // Display success alert
      toggleAlert("Form submission was successful!", "success");
    } catch (e) {
      console.error(e);
      // Display error alert
      toggleAlert("Uh oh. Something went wrong. Please try again.", "danger");
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      reset();
    }
  };
  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Contact Us"
        subtitle="Insert Pure Mille Address, Phone Number, email address"
        buttonText=""
        scrollToID=""
        image=""
      />
      <div className="contact-form-div">
        <iframe
          className="contact-form-div__map"
          title="Map: Truman Health"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.1278427350594!2d-79.39503202333132!3d43.64550845292749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3539e69517a5%3A0x8a9298752739bd34!2sTruman%20Health!5e0!3m2!1sen!2sca!4v1711043004024!5m2!1sen!2sca"
          style={{
            width: "800",
            height: "450",
            border: "0",
          }}
        ></iframe>
        <form onSubmit={onSubmit} id="contact-form" className="contact-form">
          <div className="contact-form__heading">Get in touch</div>
          <div className="contact-form__row">
            <input
              className="contact-form__row-child"
              type="text"
              placeholder="Name"
              value={name}
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter your name",
                },
                maxLength: {
                  value: 30,
                  message: "Please use 30 characters or less",
                },
              })}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="contact-form__row">
            <input
              className="contact-form__row-child"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="contact-form__row">
            <input
              className="contact-form__row-child"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="contact-form__row">
            <textarea
              className="contact-form__row-child"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <CustomButton
            title="Submit"
            btnType="submit"
            containerStyles="p-[16px] w-full border border-primary-brown bg-primary-brown text-primary-wheat-100 font-bold text-lg rounded-full hover:bg-primary-wheat-100 hover:text-primary-brown transition-all duration-500"
          />
        </form>
      </div>
    </main>
  );
}

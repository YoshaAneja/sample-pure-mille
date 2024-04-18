"use client";
import SecondaryHero from "@/components/SecondaryHero";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import emailjs from "@emailjs/browser";

interface FormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

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

  const onSubmit = async (data: FormInputs) => {
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
      toggleAlert(
        "Your message has been sent! We'll get back to you soon!",
        "success"
      );
    } catch (e) {
      console.error(e);
      // Display error alert
      toggleAlert("Uh oh. Something went wrong. Please try again.", "danger");
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      reset({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="contact-form"
          className="contact-form"
        >
          <div className="contact-form__heading">Get in touch</div>
          <div className="contact-form__row">
            <input
              className="contact-form__row-child"
              type="text"
              placeholder="Name"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>
          <div className="contact-form__row">
            <input
              className="contact-form__row-child"
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="error-message">
                Please enter a valid email address
              </span>
            )}
          </div>
          <div className="contact-form__row">
            <input
              className="contact-form__row-child"
              type="text"
              placeholder="Subject"
              {...register("subject", {
                required: {
                  value: true,
                  message: "Please enter a subject",
                },
                maxLength: {
                  value: 75,
                  message: "Subject cannot exceed 75 characters",
                },
              })}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {errors.subject && (
              <span className="error-message">{errors.subject.message}</span>
            )}
          </div>
          <div className="contact-form__row">
            <textarea
              className="contact-form__row-child"
              value={message}
              placeholder="Message"
              {...register("message", {
                required: {
                  value: true,
                  message: "Please enter a message",
                },
              })}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && (
              <span className="error-message">{errors.message.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="p-[16px] w-full border border-primary-brown bg-primary-brown text-primary-wheat-100 font-bold text-lg rounded-full hover:bg-primary-wheat-100 hover:text-primary-brown transition-all duration-500 flex-1"
          >
            Submit
          </button>
        </form>
        {alertInfo.display && (
          <div
            className="transition-all text-center font-bold text-primary-brown"
            role="alert"
          >
            {alertInfo.message}
          </div>
        )}
      </div>
    </main>
  );
}

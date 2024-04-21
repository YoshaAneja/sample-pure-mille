"use client";
import SecondaryHero from "@/components/SecondaryHero";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";

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
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });
  const [isTimeout, setIsTimeout] = useState(false);

  // Shows alert message for form submission feedback
  const toggleAlert = (message: string, type: string) => {
    setAlertInfo({ display: true, message, type });
    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
      setIsTimeout(true);
    }, 3000);
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
      toggleAlert("Uh oh. Something went wrong. Please try again.", "danger");
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
    }
  };
  if (isTimeout && isSubmitSuccessful) {
    reset();
    setIsTimeout(false);
  }

  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Contact Us"
        subtitle="puremille@puremille.com"
        subtitle2="1234 Pure Mille, Toronto ON LXG S8G"
        buttonText=""
        scrollToID=""
        image=""
      />
      <div className="flex md:justify-end justify-center align-start items-start max-sm:mx-[30px]">
        {alertInfo.display ? (
          <div
            className="transition-all text-center md:text-start font-bold text-primary-brown md:mr-[20px] my-4 w-[550px] max-md:max-w-[450px] max-sm:w-[90vw]"
            role="alert"
          >
            {alertInfo.message}
          </div>
        ) : (
          <div className="opacity-0 text-center md:text-start font-bold text-primary-brown md:mr-[20px] my-4 w-[550px] max-md:max-w-[450px] max-sm:w-[90vw]">
            Awaiting Submission
          </div>
        )}
      </div>

      <div className="contact-form-div">
        <iframe
          className="contact-form-div__map"
          title="Map: Pure Mille"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369112.0075515419!2d-80.00181039509395!3d43.717041749386354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1713729172539!5m2!1sen!2sca"
          style={{
            width: "800",
            height: "450",
            border: "0",
          }}
          loading="lazy"
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
      </div>
    </main>
  );
}

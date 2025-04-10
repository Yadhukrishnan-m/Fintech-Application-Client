import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import userAxiosInstance from "@/config/UserAxiosInstence";

// Define the form schema with Zod
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Type for our form values
type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactUs() {
  // Form state
  const [formValues, setFormValues] = useState<ContactFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Error state
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear the error for this field if it exists
    if (errors[id as keyof ContactFormValues]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = contactFormSchema.parse(formValues);
      setErrors({});
      setIsSubmitting(true);

    
      await userAxiosInstance.post('/contact-us',validatedData)


       

      
      setSubmitStatus({
        type: "success",
        message:
          "Your message has been sent successfully! We'll get back to you soon.",
      });
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactFormValues> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof ContactFormValues;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle API errors
        setSubmitStatus({
          type: "error",
          message:
            "There was a problem sending your message. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] to-[#e9f5ee] opacity-70"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d6a4f] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2d6a4f] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium">
              Contact Us
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
              Get in Touch
            </h1>
            <p className="text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed max-w-[800px]">
              Have questions about our services? Our team is here to help you
              with all your financial needs.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full mt-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
              <a
                href="#message"
                className="group flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e9f5ee]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e9f5ee] text-[#2d6a4f] group-hover:bg-[#2d6a4f] group-hover:text-white transition-all duration-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-medium">Send a Message</h3>
                <ArrowRight className="h-4 w-4 mt-2 text-[#2d6a4f] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
              <a
                href="#contact"
                className="group flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e9f5ee]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e9f5ee] text-[#2d6a4f] group-hover:bg-[#2d6a4f] group-hover:text-white transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-medium">Call Us</h3>
                <ArrowRight className="h-4 w-4 mt-2 text-[#2d6a4f] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
              <a
                href="#faq"
                className="group flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e9f5ee]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e9f5ee] text-[#2d6a4f] group-hover:bg-[#2d6a4f] group-hover:text-white transition-all duration-300">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-medium">FAQs</h3>
                <ArrowRight className="h-4 w-4 mt-2 text-[#2d6a4f] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium">
                  Reach Out
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
                  Contact Information
                </h2>
                <p className="text-gray-600 mt-4 md:text-lg">
                  Reach out to us through any of these channels, and we'll
                  respond as quickly as possible.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="overflow-hidden border-[#e9f5ee] hover:shadow-md transition-all duration-300">
                  <div className="absolute h-full w-1 bg-gradient-to-b from-[#2d6a4f] to-[#52b788] left-0 top-0"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9f5ee] flex items-center justify-center">
                        <Phone className="h-5 w-5 text-[#2d6a4f]" />
                      </div>
                      <span>Phone</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Customer Service</p>
                    <p className="font-medium text-[#2d6a4f]">
                      +1 (555) 123-4567
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-[#e9f5ee] hover:shadow-md transition-all duration-300">
                  <div className="absolute h-full w-1 bg-gradient-to-b from-[#2d6a4f] to-[#52b788] left-0 top-0"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9f5ee] flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[#2d6a4f]" />
                      </div>
                      <span>Email</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">General Inquiries</p>
                    <p className="font-medium text-[#2d6a4f]">
                      info@yourcompany.com
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-[#e9f5ee] hover:shadow-md transition-all duration-300">
                  <div className="absolute h-full w-1 bg-gradient-to-b from-[#2d6a4f] to-[#52b788] left-0 top-0"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9f5ee] flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[#2d6a4f]" />
                      </div>
                      <span>Address</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Main Office</p>
                    <p className="font-medium text-[#2d6a4f]">
                      123 Fort Road, Palakkad, Kerala 678001, India
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-[#e9f5ee] hover:shadow-md transition-all duration-300">
                  <div className="absolute h-full w-1 bg-gradient-to-b from-[#2d6a4f] to-[#52b788] left-0 top-0"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#e9f5ee] flex items-center justify-center">
                        <Clock className="h-5 w-5 text-[#2d6a4f]" />
                      </div>
                      <span>Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Monday - Friday</p>
                    <p className="font-medium text-[#2d6a4f]">
                      9:00 AM - 5:00 PM EST
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-[#2d6a4f]">
                  Our Location
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-md border border-[#e9f5ee] h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125323.4613583908!2d76.5971752!3d10.7756269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86dfa087d31ad%3A0xf542d6eb7a870a56!2sPalakkad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1712454167051!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Palakkad Office Location"
                  ></iframe>
                </div>
              </div>
            </div>

            <div id="message">
              <Card className="border-[#e9f5ee] overflow-hidden shadow-lg">
                <div className="h-2 bg-gradient-to-r from-[#2d6a4f] to-[#52b788]"></div>
                <CardHeader className="pb-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium mb-2">
                    Get in Touch
                  </div>
                  <CardTitle className="text-2xl text-[#2d6a4f]">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitStatus.type && (
                    <div
                      className={`mb-4 p-3 rounded-md ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <form className="grid gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium"
                        >
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className={`border-[#e9f5ee] focus-visible:ring-[#2d6a4f] ${
                            errors.firstName ? "border-red-300" : ""
                          }`}
                          value={formValues.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium"
                        >
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className={`border-[#e9f5ee] focus-visible:ring-[#2d6a4f] ${
                            errors.lastName ? "border-red-300" : ""
                          }`}
                          value={formValues.lastName}
                          onChange={handleChange}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className={`border-[#e9f5ee] focus-visible:ring-[#2d6a4f] ${
                          errors.email ? "border-red-300" : ""
                        }`}
                        value={formValues.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={`border-[#e9f5ee] focus-visible:ring-[#2d6a4f] ${
                          errors.phone ? "border-red-300" : ""
                        }`}
                        value={formValues.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        className={`min-h-[120px] border-[#e9f5ee] focus-visible:ring-[#2d6a4f] ${
                          errors.message ? "border-red-300" : ""
                        }`}
                        value={formValues.message}
                        onChange={handleChange}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] hover:from-[#1b4332] hover:to-[#40916c] group"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                      </span>
                      <Send className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8faf9] to-white"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9f5ee] text-[#2d6a4f] text-sm font-medium">
              Common Questions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#2d6a4f] to-[#52b788]">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed">
              Find quick answers to common questions about our services.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full mt-2"></div>
          </div>

          <div className="grid gap-6 md:gap-8 mt-8 md:mt-12 max-w-3xl mx-auto">
            {[
              {
                q: "How long does the loan application process take?",
                a: "Our standard application process typically takes 1-3 business days from submission to approval decision.",
              },
              {
                q: "What documents do I need to apply for a loan?",
                a: "For personal loans, you'll need identification, proof of income, and bank statements. Business loans require additional documentation such as business financial statements.",
              },
              {
                q: "Are there any prepayment penalties?",
                a: "No, we do not charge prepayment penalties on any of our loan products. You're free to pay off your loan early without additional fees.",
              },
              {
                q: "What interest rates do you offer?",
                a: "Our interest rates vary based on loan type, amount, term, and your credit profile. Contact us for a personalized quote.",
              },
              {
                q: "Do you offer loans to startups?",
                a: "Yes, we have special programs designed for startups and new businesses. These come with tailored terms to support early-stage growth.",
              },
            ].map((faq, i) => (
              <Card
                key={i}
                className="border-[#e9f5ee] overflow-hidden hover:shadow-md transition-all duration-300 group"
              >
                <div className="absolute h-full w-1 bg-gradient-to-b from-[#2d6a4f] to-[#52b788] left-0 top-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                <CardHeader>
                  <CardTitle className="text-lg text-[#2d6a4f] flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{faq.q}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

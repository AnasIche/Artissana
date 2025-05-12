import { Phone, Mail, MapPin, Twitter, Instagram, Youtube, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Retour à l'accueil */}
      <button className="absolute top-4 left-4 flex items-center text-[#E67E22] hover:text-[#D35400]">
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">
          <Link to="/">Back</Link>
        </span>
      </button>

      <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2">
          {/* Left Column - Contact Info */}
          <div className="bg-[#2C3E50] text-white p-8 relative overflow-hidden">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="mb-12">Say something to start a live chat!</p>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center">
                <Phone className="h-6 w-6 mr-4" />
                <span>+1012 3456 789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-4" />
                <span>demo@gmail.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-4 mt-1" />
                <span>132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="absolute bottom-8 left-8 flex space-x-4 z-10">
              <div className="bg-[#E67E22] p-2 rounded-full">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="bg-[#E67E22] p-2 rounded-full">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="bg-[#E67E22] p-2 rounded-full">
                <Youtube className="h-5 w-5" />
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute bottom-0 right-0">
              <div className="bg-[#1F3A93] opacity-30 h-40 w-40 rounded-full -mb-20 -mr-20"></div>
              <div className="absolute bottom-0 right-0 bg-[#A3B18A] h-32 w-32 rounded-full -mb-10 -mr-10"></div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#2C3E50] mb-2">Contact Us</h1>
              <p className="text-gray-600">Any question or remarks? Just write us a message!</p>
            </div>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full border-b border-gray-300 py-2 focus:border-[#1F3A93] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full border-b border-gray-300 py-2 focus:border-[#1F3A93] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border-b border-gray-300 py-2 focus:border-[#1F3A93] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border-b border-gray-300 py-2 focus:border-[#1F3A93] focus:outline-none"
                    placeholder="+1 012 3456 789"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Subject?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["General Inquiry", "Product Support", "Feedback", "Other"].map((label, idx) => (
                    <div className="flex items-center" key={idx}>
                      <input
                        type="radio"
                        id={`subject${idx}`}
                        name="subject"
                        className="h-4 w-4 text-[#1F3A93] focus:ring-[#1F3A93]"
                        defaultChecked={idx === 0}
                      />
                      <label htmlFor={`subject${idx}`} className="ml-2 text-sm text-gray-700">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border-b border-gray-300 py-2 focus:border-[#1F3A93] focus:outline-none resize-none"
                  placeholder="Write your message.."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1F3A93] text-white px-6 py-3 rounded-md hover:bg-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#1F3A93] focus:ring-opacity-50 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Linkedin, ExternalLink, ArrowRight, Sparkles, Award, Briefcase, BookOpen, Users, Globe, Code, Target, Leaf } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  // State management for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Handle form input changes
   * Updates the form state as user types
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  /**
   * Handle form submission
   * Sends form data to the email API endpoint
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send POST request to email API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: show success message and reset form
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you soon!');
        setFormData({ name: '', email: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 5000);
      } else {
        // Error: show error message
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      // Network or other error
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-600 to-blue-600 z-50 border-b border-purple-400 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            KMY
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-white hover:text-purple-100 transition-colors font-medium">About</a>
            <a href="#experience" className="text-white hover:text-purple-100 transition-colors font-medium">Experience</a>
            <a href="#conservation" className="text-white hover:text-purple-100 transition-colors font-medium">Conservation</a>
            <a href="#education" className="text-white hover:text-purple-100 transition-colors font-medium">Education</a>
            <a href="#contact" className="text-white hover:text-purple-100 transition-colors font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-purple-100 rounded-full">
                <span className="text-purple-700 font-semibold text-sm">Welcome to my portfolio</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight">
                Kolaan Moses Yendukua
              </h1>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed font-medium">
                Computer Scientist, Educator & Conservationist
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Passionate about developing assistive technologies and digital solutions that promote inclusion for women with disabilities in Africa. Dedicated conservationist working on marine conservation initiatives. Combining technology, education, conservation, and advocacy to drive sustainable social change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                  <a href="#contact" className="flex items-center gap-2">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                  <a href="#experience" className="flex items-center gap-2">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient-to-br from-purple-400 to-blue-400 bg-gradient-to-br from-purple-400 to-blue-400 p-1">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/images/profile.jpg"
                    alt="Kolaan Moses Yendukua"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I&apos;m an emerging computer scientist, educator, and conservationist with a passion for developing assistive technologies and digital solutions. My mission is to promote inclusion for women with disabilities across Africa while protecting our natural environment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With experience in teaching, mentoring, leading community-based STEM initiatives, and marine conservation work, I combine strategic thinking with practical execution to deliver meaningful results. I believe in the power of collaboration, lifelong learning, and making a positive impact in everything I do.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently pursuing my BSc (Hons) in Computer Science at African Leadership College of Higher Education in Mauritius, while actively working on marine conservation initiatives and scholarship guidance programs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-purple-700 uppercase tracking-widest mb-2">📍 Location</h3>
                  <p className="text-2xl font-bold text-gray-900">Mauritius | Powder Mill RD 21001, Pamplemousses</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest mb-2">🌍 Timezone</h3>
                  <p className="text-2xl font-bold text-gray-900">Indian/Mauritius (UTC+4)</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-2">✉️ Email</h3>
                  <p className="text-lg font-semibold text-gray-900 break-all">yendukua84@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-purple-700 uppercase tracking-widest mb-2">📱 Phone</h3>
                  <p className="text-lg font-semibold text-gray-900">+233 551 810 615</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            Education
          </h2>
          
          <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">BSc (Hons) Computer Science</h3>
                <p className="text-lg font-semibold text-purple-600 mb-2">African Leadership College Of Higher Education</p>
                <p className="text-gray-600 mb-4">Pamplemousses, Mauritius | October 2025 – September 2029</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Relevant Coursework:</p>
                  <p className="text-gray-700">Entrepreneurial Leadership • Communication for Impact • Data and Decisions • Projects</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center flex items-center justify-center gap-3">
            <Briefcase className="w-8 h-8 text-purple-600" />
            Professional Experience
          </h2>
          
          <div className="space-y-8">
            {/* Experience 1 - Marine Conservation */}
            <Card className="p-8 border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Marine Conservation Intern</h3>
                  <p className="text-lg font-semibold text-blue-600 mb-2">Extern Externships – Pamplemousse, Mauritius</p>
                  <p className="text-gray-600 mb-4 font-medium">September 2025 - Present</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Conducted interviews with local community members, recording and organizing qualitative data on marine conservation challenges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Performed in-depth research and produced <strong>three detailed research reports</strong> within two months</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Synthesized findings into a <strong>published ArcGIS StoryMap</strong> highlighting key conservation issues and insights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Developed a community-based conservation initiative and <strong>submitted a seed-funding application</strong> to support project implementation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Applied for seed funding to implement my project</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Experience 2 - Assistant Headteacher */}
            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-white hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Assistant Headteacher and Mathematics</h3>
                  <p className="text-lg font-semibold text-purple-600 mb-2">Pope John Paul II Academy – Garu, Ghana</p>
                  <p className="text-gray-600 mb-4 font-medium">July 2023 - September 2025</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Assisted the Headmaster in managing academic activities, office operations, staff relations, and representing the school at workshops and conferences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Expanded responsibilities as a Sports Teacher and organized the Science and Mathematics Quiz team for the school</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Coordinated district Science and Mathematics Quiz competitions and coached students for inter-district contests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Achieved second place in the grand finale</strong> featuring the best school from each of the four districts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Improved student performance</strong>, increasing the Mathematics pass rate from 70% to 90% within one year</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Enhanced school environment and discipline, resulting in a <strong>10% increase in student enrollment</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Conservation Work Section */}
      <section id="conservation" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center flex items-center justify-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            Conservation Work
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Marine Conservation Focus */}
            <Card className="p-8 border-2 border-green-200 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Marine Conservation Focus</h3>
                  <p className="text-green-600 font-semibold">Primary Conservation Interest</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Dedicated to protecting marine ecosystems and promoting sustainable conservation practices in Mauritius and across Africa.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Conducting community-based research on marine conservation challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Creating data-driven conservation initiatives using GIS technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Developing funding strategies for long-term conservation projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Engaging local communities in environmental stewardship</span>
                </li>
              </ul>
            </Card>

            {/* Conservation Achievements */}
            <Card className="p-8 border-2 border-teal-200 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Conservation Achievements</h3>
                  <p className="text-teal-600 font-semibold">Key Milestones</p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700"><strong>Published ArcGIS StoryMap</strong> documenting marine conservation issues and community insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700"><strong>3 Research Reports</strong> on marine conservation challenges in Mauritius</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700"><strong>Seed Funding Application</strong> submitted for community-based conservation initiative</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Active engagement with <strong>local communities</strong> on environmental issues</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Conservation Philosophy */}
          <Card className="p-8 border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">Conservation Philosophy</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              I believe that conservation is not just about protecting nature—it&apos;s about creating sustainable solutions that benefit both ecosystems and communities. By combining technology, research, and community engagement, we can develop innovative approaches to environmental challenges.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My conservation work is driven by the conviction that environmental protection and social inclusion go hand in hand. Sustainable development requires empowering all members of society, including women and people with disabilities, to participate in conservation efforts and benefit from environmental initiatives.
            </p>
          </Card>
        </div>
      </section>

      {/* Initiatives & Volunteering */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            Community Initiatives
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Yen Scholarship Guide */}
            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Yen Scholarship Guide</h3>
                  <p className="text-purple-600 font-semibold">Founder | May 2025 - Present</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Guided approximately 90 scholars in the community and beyond through scholarship application processes, with a focus on supporting individuals with disabilities.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Provided step-by-step application guidance and mentorship to maximize success rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Achieved measurable impact with <strong>two scholars receiving full-ride scholarships</strong> within a short period</span>
                </li>
              </ul>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-purple-700">✨ Impact: 2 full-ride scholarships awarded</p>
              </div>
            </Card>

            {/* Rise for Impact */}
            <Card className="p-8 border-2 border-indigo-200 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Rise for Impact</h3>
                  <p className="text-indigo-600 font-semibold">Volunteer | April 2025 - Present</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                A global youth-led initiative focused on equipping young people with the tools, mindset, and guidance to drive change in their communities.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Assisted in program activities and campaigns to inspire youth leadership and social impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Contributed to outreach and engagement efforts, fostering collaboration among youth participants</span>
                </li>
              </ul>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-indigo-700">🌍 Global reach: Ambassadors in over 10 African countries</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills & Languages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center">Skills & Languages</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Skills */}
            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-600" />
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Leadership', 'Problem Solving', 'Communication', 'Collaboration', 'Empathy', 'Teaching', 'Project Management', 'Data Analysis', 'Research', 'Innovation', 'Mentoring', 'Community Engagement', 'Conservation', 'GIS Technology'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full font-semibold text-sm border border-purple-200">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Languages */}
            <Card className="p-8 border-2 border-blue-200 shadow-lg bg-white">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                Languages
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">English</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Kusaal</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Expert</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Twi</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Expert</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Bimoba</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">French</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Beginner</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Interests */}
          <Card className="p-8 border-2 border-indigo-200 shadow-lg bg-white">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" />
              Areas of Interest
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Assistive Technologies', 'Marine Conservation', 'Nature & Wildlife Conservation', 'Education', 'Women Empowerment', 'Disability Inclusion', 'Regional Development', 'Social Change', 'STEM Initiatives', 'Environmental Sustainability'].map((interest) => (
                <span key={interest} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-semibold text-sm border border-indigo-200">
                  {interest}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-12 text-center">Get in Touch</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 text-center hover:shadow-xl transition-shadow">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <a 
                href="mailto:yendukua84@gmail.com"
                className="text-purple-600 hover:text-purple-700 transition-colors break-all font-semibold"
              >
                yendukua84@gmail.com
              </a>
            </Card>

            {/* LinkedIn */}
            <Card className="p-8 border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center hover:shadow-xl transition-shadow">
              <Linkedin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">LinkedIn</h3>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                Connect <ExternalLink className="w-4 h-4" />
              </a>
            </Card>

            {/* Phone */}
            <Card className="p-8 border-2 border-indigo-200 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-indigo-700 font-semibold">+233 551 810 615</p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-2 border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">Send a Message</h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold">✅ {submitMessage}</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold">❌ {submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition bg-white disabled:opacity-50"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition bg-white disabled:opacity-50"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition resize-none bg-white disabled:opacity-50"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <Button 
                type="submit"
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Kolaan Moses Yendukua
              </h3>
              <p className="text-sm">Computer scientist, educator, and conservationist passionate about developing assistive technologies and digital solutions for inclusion and environmental protection in Africa.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#experience" className="hover:text-purple-400 transition-colors">Experience</a></li>
                <li><a href="#conservation" className="hover:text-purple-400 transition-colors">Conservation</a></li>
                <li><a href="#education" className="hover:text-purple-400 transition-colors">Education</a></li>
                <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:yendukua84@gmail.com" className="hover:text-purple-400 transition-colors">Email</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn</a></li>
                <li><a href="tel:+233551810615" className="hover:text-purple-400 transition-colors">Phone</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Kolaan Moses Yendukua. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

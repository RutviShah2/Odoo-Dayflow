import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Logo from '@/components/layout/Logo';
import {
  Users,
  Clock,
  Calendar,
  Wallet,
  Shield,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Complete employee profiles with personal details, documents, and job information.',
  },
  {
    icon: Clock,
    title: 'Attendance Tracking',
    description: 'Real-time check-in/check-out with daily and weekly views for seamless tracking.',
  },
  {
    icon: Calendar,
    title: 'Leave Management',
    description: 'Apply for leave, track requests, and manage approvals all in one place.',
  },
  {
    icon: Wallet,
    title: 'Payroll Visibility',
    description: 'View salary structures, deductions, and net pay with complete transparency.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure access control with Admin and Employee roles for data protection.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Comprehensive dashboards with real-time insights and activity tracking.',
  },
];

const testimonials = [
  {
    name: 'Rutvi Shah',
    role: 'HR Manager',
    quote: 'Dayflow transformed how we manage our team. The approval workflow is incredibly smooth.',
  },
  {
    name: 'Disu Makadiya',
    role: 'Software Engineer',
    quote: 'Finally, an HR system that is actually enjoyable to use. The interface is beautiful!',
  },
  {
    name: 'Vaibhavi Karia',
    role: 'UI/UX Designer',
    quote: 'The attendance tracking is so intuitive. I love how everything is just a click away.',
  },
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 left-20 w-72 h-72 bg-info/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-60 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Every workday, perfectly aligned</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Simplify HR with</span>
              <br />
              <span className="gradient-text-animated">Dayflow</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A modern Human Resource Management System that streamlines employee management,
              attendance tracking, leave approvals, and payroll visibility — all in one beautiful interface.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="group">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Employees</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">99%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage HR</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to simplify human resource operations for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by teams everywhere</h2>
            <p className="text-lg text-muted-foreground">See what our users have to say about Dayflow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-warning fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 lg:p-20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to transform your HR operations?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                Join hundreds of companies that trust Dayflow to manage their workforce efficiently.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth?mode=signup">
                  <Button variant="heroOutline" size="xl" className="group">
                    Start for Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2026 Dayflow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

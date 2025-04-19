import PopularInterviews from "@/components/PopularInterviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsById } from "@/lib/actions/interview.action";
import { Interview } from "@/types";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Briefcase,
  ChevronRight,
  Code,
  MessageSquare,
  Star,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const users = await getCurrentUser();
  const interviewsData = await getInterviewsById(users?.id as string);

  console.log(interviewsData);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="container relative mx-auto px-4 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in">
              Practice Interviews with AI
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed animate-fade-in delay-100">
              Create customized interview sessions and let our AI interviewer
              help you prepare for your next big opportunity.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full border text-base px-8 py-6 h-auto animate-fade-in delay-200 animate-pulse-slow"
            >
              <Link href="/interview">
                Create Your Interview <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating elements animation */}
        <div className="hidden md:block absolute top-1/4 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-fade-in delay-300"></div>
        <div className="hidden md:block absolute bottom-1/4 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-fade-in delay-400"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Intervu Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to practice interviews and improve your
              skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="AI-Powered Questions"
              description="Our AI generates relevant questions based on your selected topics."
              delay="delay-200"
            />
            <FeatureCard
              icon={<BadgeCheck className="h-10 w-10 text-primary" />}
              title="Improve Your Skills"
              description="Practice in a realistic environment and gain confidence for your real interviews."
              delay="delay-300"
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-primary" />}
              title="Detailed Feeback"
              description="Get detailed feedback from the interviewer and improve for next time"
              delay="delay-100"
            />
          </div>
        </div>
      </section>

      {/* Popular Interview Types - NEW SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Previous Interviews
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practice your past interviews again to refine your skills and
              build confidence for future opportunities.
            </p>
          </div>

          <PopularInterviews interviewData={interviewsData} />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Other Interview Templates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jump start your interview practice with these ready-to-use
              templates
            </p>
          </div>

          <PopularInterviews interviewData={interviewsData} />
        </div>
      </section>

      {/* Interview Types */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interview Types
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practice for any kind of interview with our specialized AI
              interviewers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <InterviewTypeCard
              icon={<Code className="h-16 w-16 text-primary" />}
              title="Technical Interviews"
              description="Practice coding problems, system design, and technical concepts for software engineering roles."
              to="/interview"
              buttonText="Create Technical Interview"
              className="animate-slide-in"
            />
            <InterviewTypeCard
              icon={<MessageSquare className="h-16 w-16 text-primary" />}
              title="Non-Technical Interviews"
              description="Practice behavioral questions, situational interviews, and communication skills."
              to="/interview"
              buttonText="Create Behavioral Interview"
              className="animate-slide-in delay-100"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Intervu has helped professionals prepare for their
              interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              quote="The AI interviewer asked me questions I actually got in my real technical interview. I felt so prepared!"
              author="Sarah J."
              role="Software Engineer"
              rating={5}
            />
            <TestimonialCard
              quote="Practicing with Intervu helped me overcome my interview anxiety. The behavioral questions were spot-on."
              author="Michael T."
              role="Product Manager"
              rating={5}
            />
            <TestimonialCard
              quote="As a career coach, I recommend Intervu to all my clients. It's like having an interview partner available 24/7."
              author="Rebecca L."
              role="Career Coach"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 rounded-lg mx-4 my-12 md:mx-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to ace your next interview?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start practicing with our AI interviewer today and build your
            confidence for the real thing.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full text-base px-8 py-6 h-auto group"
          >
            <Link href="/interview-interview">
              Get Started Now{" "}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center text-center p-8 rounded-xl border border-border/40 shadow-sm feature-card animate-fade-in ${delay}`}
    >
      <div className="mb-6 p-4 bg-primary/5 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface InterviewTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  buttonText: string;
  className?: string;
}

const InterviewTypeCard: React.FC<InterviewTypeCardProps> = ({
  icon,
  title,
  description,
  to,
  buttonText,
  className = "",
}) => {
  return (
    <Card
      className={`overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="mb-6 p-4 bg-primary/5 rounded-full">{icon}</div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button asChild>
          <Link href={to} className="group">
            {buttonText}{" "}
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  rating,
}) => {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm">
      <CardContent className="p-8">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="italic text-gray-700 mb-6">&quot;{quote}&quot;</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mr-3">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

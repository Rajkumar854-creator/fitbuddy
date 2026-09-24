import React from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  Compass,
  Dumbbell,
  HeartPulse,
  Leaf,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Button from "./components/Button";
import ProgressBar from "./components/ProgressBar";
import { StatCard, WorkoutCard, PlanCard } from "./components/Cards";
import StepIndicator from "./components/StepIndicator";
import samplePlans from "./data/samplePlans";
import { generatePlan } from "./utils/planGenerator";
import { validatePreferences } from "./utils/validation";
import {
  calculateProgress,
  calculateStreak,
  completeWorkout,
  getCompletedWorkouts,
  getCurrentPlan,
  getCurrentUser,
  login,
  recordWorkoutDate,
  saveCurrentPlan,
  savePlan,
  savePreferences,
  setWorkoutCompleted,
} from "./utils/storage";

const defaultPrefs = {
  name: "",
  goal: "",
  experience: "",
  days: "",
  duration: "",
  location: "",
  equipment: "",
  focusAreas: [],
  preferences: "",
};
function Layout({ children }) {
  if (!getCurrentUser()) return <Login />;
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!login(username.trim(), password)) {
      setError("Use user1 or user2 with the shared password.");
      return;
    }
    navigate("/create-plan");
  };
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-mark"><WavesIcon /></div>
        <span className="eyebrow">Welcome to FitBuddy</span>
        <h1>Make room for <em>your rhythm.</em></h1>
        <p>Log in to open your private plan and weekly workout checklist.</p>
        <form onSubmit={submit} className="login-form">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="user1 / user2" autoComplete="username" autoFocus />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="123456789" autoComplete="current-password" />
          {error && <p className="form-error">{error}</p>}
          <button className="button login-submit" type="submit">Log in <ArrowRight size={16} /></button>
        </form>
        <small className="login-hint">Two demo accounts are available: user1 and user2.
        </small>
      </section>
    </main>
  );
}
function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <span className="kicker">
            <span className="dot" /> Personal plans for real life
          </span>
          <h1>
            Your fitness.
            <br />
            <em>Your plan.</em>
            <br />
            Your progress.
          </h1>
          <p>
            Build a rhythm that fits your energy, your schedule, and the version
            of you you’re becoming.
          </p>
          <div className="hero-actions">
            <Button to="/create-plan">
              Create my plan <ArrowRight size={17} />
            </Button>
            <Button to="/sample-plans" variant="button-quiet">
              Explore plans <Compass size={17} />
            </Button>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack">
              <span>J</span>
              <span>M</span>
              <span>A</span>
              <span>+</span>
            </div>
            <span>
              Join 2,400+ people
              <br />
              <b>moving with intention</b>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="sun-disc" />
          <div className="hero-stat">
            <span>this week</span>
            <strong>
              03<span>/05</span>
            </strong>
            <small>workouts complete</small>
          </div>
          <div className="hero-wave wave-one" />
          <div className="hero-wave wave-two" />
          <div className="hero-orbit">
            <span>✦</span>
          </div>
          <div className="hero-person">
            <div className="head" />
            <div className="body" />
            <div className="leg left" />
            <div className="leg right" />
            <div className="arm left" />
            <div className="arm right" />
          </div>
          <span className="art-label">
            Find your flow <ArrowRight size={14} />
          </span>
        </div>
      </section>
      <section className="feature-band">
        <div className="section-intro">
          <span className="eyebrow">Designed around you</span>
          <h2>
            A little structure.
            <br />
            <em>A lot more you.</em>
          </h2>
        </div>
        <div className="feature-grid">
          <Feature
            icon={Target}
            title="Personalized plans"
            text="Every session shaped around your goals and your starting point."
          />
          <Feature
            icon={BarChart3}
            title="Progress that feels good"
            text="See your consistency grow without letting numbers take over."
          />
          <Feature
            icon={HeartPulse}
            title="Guidance when you need it"
            text="Clear, friendly instructions for every movement in your plan."
          />
          <Feature
            icon={Zap}
            title="Flexible by design"
            text="Your plan adapts when life gets busy. Keep the rhythm."
          />
        </div>
      </section>
      <section className="how-section">
        <div>
          <span className="eyebrow">The FitBuddy way</span>
          <h2>
            Small steps,
            <br />
            <em>lasting change.</em>
          </h2>
        </div>
        <div className="steps-list">
          <div>
            <b>01</b>
            <span>
              <strong>Choose your goal</strong>
              <small>Decide what deserves your energy right now.</small>
            </span>
          </div>
          <div>
            <b>02</b>
            <span>
              <strong>Set your preferences</strong>
              <small>Tell us what fits your life and your space.</small>
            </span>
          </div>
          <div>
            <b>03</b>
            <span>
              <strong>Make it yours</strong>
              <small>Get a plan built from thoughtful movement.</small>
            </span>
          </div>
          <div>
            <b>04</b>
            <span>
              <strong>Keep your promise</strong>
              <small>Show up, check in, and celebrate progress.</small>
            </span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
function Feature({ icon: Icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">
        <Icon size={22} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
function CreatePlan() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);
  const [prefs, setPrefs] = React.useState({ ...defaultPrefs });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const fields = [
    {
      title: "What should we call you?",
      sub: "Your name will appear throughout your personalized FitBuddy plan.",
      key: "name",
      input: true,
    },
    {
      title: "What is your main goal?",
      sub: "Choose the direction that feels right for this season.",
      key: "goal",
      options: [
        "General Fitness",
        "Strength",
        "Endurance",
        "Flexibility",
        "Weight Management",
        "Healthy Lifestyle",
      ],
    },
    {
      title: "What is your experience?",
      sub: "We’ll meet you at the level you’re at today.",
      key: "experience",
      options: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      title: "How many sessions per week?",
      sub: "Consistency beats intensity. Choose what feels realistic.",
      key: "days",
      options: [2, 3, 4, 5, 6],
    },
    {
      title: "How long can you exercise?",
      sub: "Your best workout is the one you have time to finish.",
      key: "duration",
      options: [15, 30, 45, 60],
    },
    {
      title: "Where will you work out?",
      sub: "Your surroundings can support your rhythm.",
      key: "location",
      options: ["Home", "Gym", "Outdoor", "Anywhere"],
    },
    {
      title: "What equipment do you have?",
      sub: "We’ll only suggest movements that make sense for you.",
      key: "equipment",
      options: [
        "No Equipment",
        "Dumbbells",
        "Resistance Bands",
        "Full Gym",
        "Mixed Equipment",
      ],
    },
    {
      title: "What areas do you want to focus on?",
      sub: "Pick one or more places you’d like to feel stronger.",
      key: "focusAreas",
      options: [
        "Full Body",
        "Upper Body",
        "Lower Body",
        "Core",
        "Cardio",
        "Mobility",
      ],
      multi: true,
    },
    {
      title: "Any preferences?",
      sub: "A note about your routine, access, or what helps you enjoy moving.",
      key: "preferences",
      textarea: true,
    },
  ];
  const current = fields[step];
  const choose = (value) =>
    setPrefs((old) => ({
      ...old,
      [current.key]: current.multi
        ? old.focusAreas.includes(value)
          ? old.focusAreas.filter((x) => x !== value)
          : [...old.focusAreas, value]
        : value,
    }));
  const next = () => {
    const currentValue = prefs[current.key];
    const isEmpty = currentValue === "" || currentValue == null || (Array.isArray(currentValue) && currentValue.length === 0);
    if (current.key !== "preferences" && isEmpty) {
      setError("Choose an option to continue.");
      return;
    }
    setError("");
    if (step < fields.length - 1) setStep(step + 1);
    else {
      const normalized = { ...prefs, days: Number(prefs.days), duration: Number(prefs.duration) };
      const missing = validatePreferences(normalized);
      if (missing.length) {
        setError("Please complete your selections before generating.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const plan = generatePlan(normalized);
        savePreferences(normalized);
        saveCurrentPlan(plan);
        savePlan(plan);
        navigate("/plan");
      }, 1100);
    }
  };
  return (
    <Layout>
      <section className="form-page">
        <div className="form-aside">
          <span className="eyebrow">Create your rhythm</span>
          <h1>
            Build a plan that feels <em>like yours.</em>
          </h1>
          <p>Eight thoughtful questions. One clear place to start.</p>
          <div className="aside-note">
            <Sparkles size={17} />
            <span>
              Your answers stay in your browser and are never sent anywhere.
            </span>
          </div>
        </div>
        <div className="form-panel">
          {loading ? (
            <div className="loading">
              <div className="loading-ring">
                <WavesIcon />
              </div>
              <h2>
                Creating your plan<span>...</span>
              </h2>
              <p>Matching movement to your preferences.</p>
            </div>
          ) : (
            <>
              <StepIndicator step={step} total={fields.length} />
              <div className="question">
                <span className="question-number">
                  {String(step + 1).padStart(2, "0")}
                </span>
                <h2>{current.title}</h2>
                <p>{current.sub}</p>
                {current.input ? (
                  <input
                    className="name-input"
                    value={prefs.name}
                    onChange={(e) => setPrefs({ ...prefs, name: e.target.value })}
                    placeholder="Your first name"
                    autoFocus
                  />
                ) : current.textarea ? (
                  <textarea
                    value={prefs.preferences}
                    onChange={(e) =>
                      setPrefs({ ...prefs, preferences: e.target.value })
                    }
                    placeholder="I prefer simple workouts, and I love a good playlist..."
                  />
                ) : (
                  <div className="option-grid">
                    {current.options.map((option) => (
                      <button
                        key={option}
                        className={
                          (
                            current.multi
                              ? prefs.focusAreas.includes(option)
                              : prefs[current.key] === option
                          )
                            ? "option selected"
                            : "option"
                        }
                        onClick={() => choose(option)}
                      >
                        {option}
                        <span className="option-mark">
                          {(
                            current.multi
                              ? prefs.focusAreas.includes(option)
                              : prefs[current.key] === option
                          ) ? (
                            <Check size={15} />
                          ) : (
                            ""
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {error && <p className="form-error">{error}</p>}
              </div>
              <div className="form-footer">
                {step > 0 ? (
                  <button
                    className="back-btn"
                    onClick={() => {
                      setStep(step - 1);
                      setError("");
                    }}
                  >
                    <ChevronLeft size={17} /> Back
                  </button>
                ) : (
                  <span />
                )}
                <Button onClick={next}>
                  {step === fields.length - 1 ? "Generate my plan" : "Continue"}{" "}
                  {step === fields.length - 1 ? (
                    <Sparkles size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
function WavesIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M5 21c5-7 10 7 15 0s10 7 15 0M5 28c5-7 10 7 15 0s10 7 15 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Plan() {
  const navigate = useNavigate();
  const [plan, setPlan] = React.useState(getCurrentPlan());
  const [message, setMessage] = React.useState("");
  if (!plan)
    return (
      <Empty
        title="No plan to show yet"
        text="A few answers are all it takes to create your first rhythm."
      />
    );
  const prefs = plan.preferences;
  const completed = getCompletedWorkouts();
  const regenerate = () => {
    const next = generatePlan(prefs, plan);
    saveCurrentPlan(next);
    setPlan(next);
    setMessage("New plan generated");
    setTimeout(() => setMessage(""), 2200);
  };
  return (
    <Layout>
      <section className="page-head">
        <div>
          <span className="eyebrow">Your starting point</span>
          <h1>
            {prefs.name ? `${prefs.name}'s` : "Your personalized"} <em>plan.</em>
          </h1>
          <p>
            A weekly rhythm with {prefs.days} sessions for {prefs.goal.toLowerCase()}, shaped
            around {prefs.duration} minutes.
          </p>
        </div>
        <div className="head-actions">
          <Button
            variant="button-quiet"
            onClick={() => navigate("/create-plan")}
          >
            Edit preferences
          </Button>
          <Button onClick={regenerate}>
            <RotateCcw size={16} /> Regenerate
          </Button>
        </div>
      </section>
      <section className="plan-summary">
        <Summary label="Goal" value={prefs.goal} />
        <Summary label="Experience" value={prefs.experience} />
        <Summary label="Sessions / week" value={`${prefs.days} sessions`} />
        <Summary label="Session" value={`${prefs.duration} min`} />
        <Summary label="Equipment" value={prefs.equipment} />
      </section>
      <section className="schedule-section">
        <div className="section-bar">
          <div>
            <span className="eyebrow">Your week</span>
            <h2>Make some room for movement.</h2>
          </div>
          {message && (
            <span className="toast">
              <Check size={15} />
              {message}
            </span>
          )}
        </div>
        <div className="workout-list">
          {plan.workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              completed={completed.includes(workout.id)}
            />
          ))}
        </div>
      </section>
      <div className="bottom-cta">
        <Button variant="button-quiet" to="/dashboard">
          Back to dashboard
        </Button>
        <Button
          onClick={() => {
            savePlan(plan);
            navigate("/dashboard");
          }}
        >
          Save plan <Check size={16} />
        </Button>
      </div>
    </Layout>
  );
}
function Summary({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
function WeeklyTracker({ workouts, completed, onToggle }) {
  return (
    <section className="tracker-section">
      <div className="section-bar">
        <div>
          <span className="eyebrow">Weekly checklist</span>
          <h2>Keep your week moving.</h2>
        </div>
        <span className="tracker-count">
          {completed.length}/{workouts.length} complete
        </span>
      </div>
      <div className="tracker-table" role="table" aria-label="Weekly workout checklist">
        <div className="tracker-row tracker-header" role="row">
          <span>Done</span><span>Day</span><span>Workout</span><span>Time</span><span>Status</span>
        </div>
        {workouts.map((workout) => {
          const isComplete = completed.includes(workout.id);
          return (
            <div className={`tracker-row ${isComplete ? "is-complete" : ""}`} role="row" key={workout.id}>
              <button className="tracker-check" onClick={() => onToggle(workout.id)} aria-label={`${isComplete ? "Uncheck" : "Complete"} ${workout.title}`} aria-pressed={isComplete}>
                {isComplete && <Check size={15} />}
              </button>
              <strong>{workout.day}</strong>
              <span>{workout.title}</span>
              <span>{workout.duration} min</span>
              <span className="tracker-status">{isComplete ? "Completed" : "Ready"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
function Dashboard() {
  const plan = getCurrentPlan();
  if (!plan)
    return (
      <Empty
        title="No fitness plan yet"
        text="Start with a few simple choices and FitBuddy will shape the week around you."
        button="Create my plan"
        to="/create-plan"
      />
    );
  const [completed, setCompleted] = React.useState(getCompletedWorkouts());
  const progress = plan.workouts.length ? Math.round((completed.filter((id) => plan.workouts.some((workout) => workout.id === id)).length / plan.workouts.length) * 100) : 0;
  const toggleWorkout = (id) => {
    const next = !completed.includes(id);
    setWorkoutCompleted(id, next);
    setCompleted(getCompletedWorkouts());
  };
  const next =
    plan.workouts.find((w) => !completed.includes(w.id)) || plan.workouts[0];
  return (
    <Layout>
      <section className="dashboard-head">
        <div>
          <span className="eyebrow">Good to see you</span>
          <h1>
            Welcome, <em>{plan.preferences.name || "back"}.</em>
          </h1>
          <p>Your next good decision is already waiting for you.</p>
        </div>
        <Button to="/create-plan" variant="button-quiet">
          Edit plan <RotateCcw size={16} />
        </Button>
      </section>
      <section className="stats-grid">
        <StatCard
          label="Current goal"
          value={plan.preferences.goal}
          detail="Your north star"
          icon={Target}
        />
        <StatCard
          label="Sessions / week"
          value={`${plan.preferences.days}/wk`}
          detail="Built for your rhythm"
          icon={CalendarIcon}
        />
        <StatCard
          label="Completed"
          value={
            completed.filter((id) => plan.workouts.some((w) => w.id === id))
              .length
          }
          detail="Sessions checked off"
          icon={Trophy}
        />
        <StatCard
          label="Plan progress"
          value={`${progress}%`}
          detail="Keep your tide moving"
          icon={BarChart3}
        />
      </section>
      <section className="today-layout">
        <div className="today-card">
          <div className="today-copy">
            <span className="eyebrow">Up next · {next.day}</span>
            <h2>{next.title}</h2>
            <p>
              {next.exercises.length} movements to help you feel strong, steady,
              and present.
            </p>
            <div className="today-meta">
              <span>
                <Clock3 size={15} />
                {next.duration} minutes
              </span>
              <span>
                <Dumbbell size={15} />
                {next.difficulty}
              </span>
            </div>
            <Button to={`/workout/${next.id}`}>
              Start workout <Play size={15} fill="currentColor" />
            </Button>
          </div>
          <div className="today-art">
            <div className="mini-sun" />
            <div className="mini-wave" />
          </div>
        </div>
        <div className="progress-card">
          <span className="eyebrow">Your progress</span>
          <div className="progress-number">
            <strong>{progress}%</strong>
            <span>this plan</span>
          </div>
          <ProgressBar value={progress} />
          <div className="progress-foot">
            <span>
              {
                completed.filter((id) => plan.workouts.some((w) => w.id === id))
                  .length
              }{" "}
              complete
            </span>
            <span>{calculateStreak()} day streak</span>
          </div>
        </div>
      </section>
      <WeeklyTracker workouts={plan.workouts} completed={completed} onToggle={toggleWorkout} />
      <section className="schedule-section dashboard-schedule">
        <div className="section-bar">
          <div>
            <span className="eyebrow">The week ahead</span>
            <h2>Your schedule</h2>
          </div>
          <Link className="text-link" to="/plan">
            View full plan <ArrowRight size={15} />
          </Link>
        </div>
        <div className="workout-list">
          {plan.workouts.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              completed={completed.includes(w.id)}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
function CalendarIcon() {
  return <span className="calendar-glyph">◫</span>;
}
function Workout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = getCurrentPlan();
  const workout = plan?.workouts.find((item) => item.id === id);
  const [done, setDone] = React.useState(getCompletedWorkouts().includes(id));
  if (!workout)
    return (
      <Empty
        title="Workout not found"
        text="This movement may have moved on. Head back to your plan to choose another."
        to="/plan"
        button="Back to plan"
      />
    );
  const finish = () => {
    completeWorkout(id);
    recordWorkoutDate();
    setDone(true);
  };
  return (
    <Layout>
      <section className="workout-head">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={17} /> Back
        </button>
        <span className="eyebrow">
          {workout.day} · {workout.difficulty}
        </span>
        <h1>{workout.title}</h1>
        <p>
          <Clock3 size={16} />
          {workout.duration} minutes <span>·</span> {workout.exercises.length}{" "}
          movements
        </p>
      </section>
      <section className="exercise-layout">
        <div className="exercise-main">
          <div className="warmup">
            <span>01</span>
            <div>
              <strong>Warm up</strong>
              <p>
                Take 3 minutes to march in place and circle through your
                shoulders, hips, and ankles.
              </p>
            </div>
          </div>
          <div className="exercise-list">
            {workout.exercises.map((item, index) => (
              <article className="exercise-card" key={item.id}>
                <div className="exercise-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="exercise-info">
                  <div>
                    <span className="eyebrow">
                      {item.category} · {item.equipment}
                    </span>
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.description}</p>
                  <div className="exercise-data">
                    <span>
                      <b>{item.defaultSets}</b> sets
                    </span>
                    <span>
                      <b>{item.defaultReps}</b>
                    </span>
                    <span>
                      <b>{item.rest}</b> rest
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="warmup cooldown">
            <span>✦</span>
            <div>
              <strong>Cool down</strong>
              <p>
                End with a few slow breaths and any gentle stretch that feels
                welcome today.
              </p>
            </div>
          </div>
        </div>
        <aside className="finish-panel">
          <span className="eyebrow">One more thing</span>
          <h2>How did that feel?</h2>
          <p>Checking off a workout is a small vote for the life you want.</p>
          <button
            className={`finish-button ${done ? "finished" : ""}`}
            onClick={finish}
          >
            {done ? (
              <>
                <Check size={18} /> Workout complete
              </>
            ) : (
              <>
                Mark workout complete <Check size={17} />
              </>
            )}
          </button>
        </aside>
      </section>
    </Layout>
  );
}
function Samples() {
  const navigate = useNavigate();
  const useSample = (sample) => {
    const prefs = {
      goal: sample.goal,
      experience: sample.difficulty,
      days: sample.days,
      duration: sample.duration,
      location: sample.equipment === "No Equipment" ? "Home" : "Gym",
      equipment: sample.equipment,
      focusAreas:
        sample.goal === "Flexibility"
          ? ["Mobility"]
          : sample.goal === "Endurance"
            ? ["Cardio"]
            : ["Full Body"],
      preferences: "",
    };
    const plan = generatePlan(prefs);
    savePreferences(prefs);
    saveCurrentPlan(plan);
    savePlan(plan);
    navigate("/dashboard");
  };
  return (
    <Layout>
      <section className="page-head samples-head">
        <div>
          <span className="eyebrow">A place to begin</span>
          <h1>
            Find your <em>starting point.</em>
          </h1>
          <p>
            Borrow a little structure, then make it your own. Every plan is
            ready to use today.
          </p>
        </div>
      </section>
      <section className="samples-grid">
        {samplePlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onUse={() => useSample(plan)} />
        ))}
      </section>
    </Layout>
  );
}
function Empty({
  title,
  text,
  to = "/create-plan",
  button = "Create my plan",
}) {
  return (
    <Layout>
      <section className="empty">
        <div className="empty-icon">
          <WavesIcon />
        </div>
        <span className="eyebrow">A clear horizon</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <Button to={to}>
          {button} <ArrowRight size={16} />
        </Button>
      </section>
    </Layout>
  );
}
function NotFound() {
  return (
    <Empty
      title="Page not found"
      text="The page you’re looking for has drifted out of view."
      to="/"
      button="Back to home"
    />
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-plan" element={<CreatePlan />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/sample-plans" element={<Samples />} />
      <Route path="/workout/:id" element={<Workout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

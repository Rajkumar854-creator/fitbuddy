import exercises from '../data/exercises';
const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const goalCategories = { Strength:['Upper Body','Lower Body','Full Body','Core'], Endurance:['Cardio','Full Body'], Flexibility:['Mobility'], 'Weight Management':['Cardio','Full Body','Core'], 'Healthy Lifestyle':['Full Body','Cardio','Mobility'], 'General Fitness':['Full Body','Upper Body','Lower Body','Core'] };
const equipmentMatches = (item, selected) => selected === 'No Equipment' ? item.equipment === 'None' : selected === 'Mixed Equipment' || selected === 'Full Gym' ? true : item.equipment === 'None' || item.equipment === selected;
const difficultyRank = { Beginner:1, Intermediate:2, Advanced:3 };
const shuffle = list => [...list].sort(() => Math.random() - 0.5);
export function generatePlan(preferences, previous = null) {
  const { goal='General Fitness', experience='Beginner', days=3, duration=30, location='Anywhere', equipment='No Equipment', focusAreas=['Full Body'] } = preferences || {};
  const categories = [...new Set([...(focusAreas.length ? focusAreas : []), ...(goalCategories[goal] || [])])];
  let pool = exercises.filter(item => difficultyRank[item.difficulty] <= difficultyRank[experience] && equipmentMatches(item, equipment));
  if (location === 'Outdoor') pool = pool.filter(item => !['Gym','Dumbbells'].includes(item.equipment));
  if (pool.length < 3) pool = exercises.filter(item => equipmentMatches(item, equipment));
  if (pool.length < 3) pool = exercises;
  const prioritized = shuffle(pool).sort((a,b) => (categories.includes(b.category) ? 1 : 0) - (categories.includes(a.category) ? 1 : 0));
  const sessions = Math.max(2, Math.min(Number(days) || 3, 6));
  const sessionDuration = Number(duration) || 30;
  const perWorkout = sessionDuration <= 15 ? 3 : sessionDuration <= 30 ? 4 : sessionDuration <= 45 ? 5 : 6;
  const used = new Set();
  const workouts = Array.from({ length:sessions }, (_, index) => {
    let chosen = prioritized.filter(item => !used.has(item.id) && (index === 0 || categories.includes(item.category))).slice(0, perWorkout);
    if (chosen.length < perWorkout) chosen = [...chosen, ...prioritized.filter(item => !used.has(item.id)).slice(0, perWorkout - chosen.length)];
    if (chosen.length < perWorkout) chosen = [...chosen, ...prioritized.slice(0, perWorkout - chosen.length)];
    chosen.forEach(item => used.add(item.id));
    const category = chosen[0]?.category || 'Full Body';
    const title = goal === 'Flexibility' ? 'Restore & Stretch' : goal === 'Endurance' ? `${category} Endurance` : `${category} ${goal}`;
    return { id:`workout-${Date.now()}-${index}-${Math.random().toString(36).slice(2,7)}`, day:dayNames[Math.floor(index * 7 / sessions)], title, duration:sessionDuration, difficulty:experience, exercises:chosen.map(item => ({ ...item, rest:'45 sec' })) };
  });
  const signature = workouts.map(workout => workout.exercises.map(item => item.id).join(',')).join('|');
  if (previous?.signature === signature && workouts[0]?.exercises.length > 1) workouts[0].exercises.reverse();
  return { id:`plan-${Date.now()}`, createdAt:new Date().toISOString(), signature, preferences:{...preferences, days:sessions, duration:sessionDuration}, workouts };
}

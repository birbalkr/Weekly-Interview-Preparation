import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Icon } from '../../shared/Icon'

type Question = { id: number; title: string; category: 'DSA' | 'Git' | 'Technical'; difficulty: 'Easy' | 'Medium' | 'Hard'; status: 'Pending' | 'In Progress' | 'Completed'; createdAt?: string }
const questionsStorageKey = 'preply-questions-v2'

export function DashboardPage() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>(() => readQuestions())
  useEffect(() => {
    const refreshQuestions = () => setQuestions(readQuestions())
    window.addEventListener('storage', refreshQuestions)
    return () => window.removeEventListener('storage', refreshQuestions)
  }, [])
  const stats = useMemo(() => {
    const completed = (items: Question[]) => items.filter((question) => question.status === 'Completed').length
    const dsa = questions.filter((question) => question.category === 'DSA')
    const interview = questions.filter((question) => question.category === 'Git' || question.category === 'Technical')
    const totalCompleted = completed(questions)
    return {
      total: questions.length,
      totalCompleted,
      dsa: dsa.length,
      dsaCompleted: completed(dsa),
      interview: interview.length,
      interviewCompleted: completed(interview),
      overallPercentage: questions.length ? Math.round((totalCompleted / questions.length) * 100) : 0,
      dsaPercentage: dsa.length ? Math.round((completed(dsa) / dsa.length) * 100) : 0,
      interviewPercentage: interview.length ? Math.round((completed(interview) / interview.length) * 100) : 0,
    }
  }, [questions])
  const recentQuestions = useMemo(() => [...questions].sort((first, second) => {
    const firstTime = first.createdAt ? Date.parse(first.createdAt) : first.id
    const secondTime = second.createdAt ? Date.parse(second.createdAt) : second.id
    return secondTime - firstTime
  }).slice(0, 3), [questions])
  const openQuestions = (query = '') => navigate(`/questions${query}`)
  return <div className="page-content">
    <section className="welcome-row"><div><p className="eyebrow">SUNDAY, OCTOBER 18, 2026</p><h1>Good morning, Alex <span>✦</span></h1><p className="intro">Small progress every day adds up to big results. Let&apos;s keep the momentum going.</p></div><button type="button" className="primary-button" onClick={() => openQuestions('?status=In%20Progress')}>Continue learning <Icon name="arrow" size={16} /></button></section>
    <section className="stats-grid" aria-label="Preparation statistics">
      <Stat onClick={() => openQuestions()} className="stat-purple" label="Total questions" value={`${stats.total}`} detail={`${stats.totalCompleted}  completed`} icon="bookmark" />
      <Stat onClick={() => openQuestions('?category=DSA')} className="stat-orange" label="DSA problems" value={`${stats.dsaCompleted}`} total={`/ ${stats.dsa}`} detail={`${stats.dsaPercentage}%  completed`} icon="code" progress={stats.dsaPercentage} />
      <Stat onClick={() => openQuestions('?category=Technical')} className="stat-blue" label="Interview questions" value={`${stats.interviewCompleted}`} total={`/ ${stats.interview}`} detail={`${stats.interviewPercentage}%  completed`} icon="briefcase" progress={stats.interviewPercentage} />
      <Stat onClick={() => openQuestions('?category=Technical&focus=machine')} className="stat-green" label="Machine coding" value="0" total="/ 0" detail="0%  completed" icon="layers" progress={0} />
    </section>
    <section className="dashboard-grid">
      <article className="panel progress-panel"><PanelHeading title="Overall progress" subtitle="Your preparation at a glance" action="View details" onAction={() => openQuestions()} /><div className="progress-body"><div className="donut" style={{ background: `conic-gradient(#7056d9 0 ${stats.overallPercentage}%, #e2e9f4 ${stats.overallPercentage}% 100%)` }}><div><strong>{stats.overallPercentage}%</strong><span>Complete</span></div></div><div className="legend"><Legend color="purple" label="DSA practice" value={`${stats.dsaPercentage}%`} /><Legend color="orange" label="Interview prep" value={`${stats.interviewPercentage}%`} /><Legend color="blue" label="Machine coding" value="0%" /></div></div><div className="goal-callout"><div className="goal-icon">✦</div><div><strong>{stats.total ? 'Keep building your streak!' : 'Start your preparation!'}</strong><span>Add questions to see your progress here.</span></div><span className="goal-days">{stats.totalCompleted} completed</span></div></article>
      <article className="panel weekly-panel"><PanelHeading title="Weekly activity" subtitle="Questions completed this week" /><div className="chart"><div className="chart-y"><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span></div><div className="chart-main"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bars">{[8, 13, 10, 17, 12, 19, 5].map((height, index) => <div className="bar-column" key={index}><i style={{ height: `${height * 4.2}%` }} className={index === 5 ? 'highlight' : ''} /><span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div></div></div></article>
    </section>
    <section className="bottom-grid">
      <article className="panel activity-panel"><PanelHeading title="Recent activity" subtitle="Pick up where you left off" action="View all" onAction={() => openQuestions()} /><div className="activity-list">{recentQuestions.length ? recentQuestions.map((question) => <button type="button" className="activity-item" key={question.id} onClick={() => openQuestions(`?search=${encodeURIComponent(question.title)}`)}><div className={`activity-icon ${activityColor(question.category)}`}><Icon name={activityIcon(question.category)} size={18} /></div><div className="activity-info"><strong>{question.title}</strong><span>{question.category} · {question.difficulty}</span></div><time>{formatRelativeTime(question.createdAt)}</time><Icon name="chevron" size={16} /></button>) : <div className="activity-empty"><span className="activity-empty-icon">✦</span><strong>No activity yet</strong><span>Add your first question to start building your preparation history.</span></div>}</div></article>
      <article className="panel next-panel"><PanelHeading title="Up next" subtitle="Recommended for you" /><div className="next-card"><div className="next-card-top"><span className="tag purple-tag">DSA · MEDIUM</span><span className="time"><Icon name="clock" size={14} /> 25 min</span></div><h3>Longest Substring Without Repeating Characters</h3><p>Practice sliding window techniques and improve your problem-solving speed.</p><button type="button" className="outline-button" onClick={() => openQuestions('?search=Longest%20Substring')}>Start problem <Icon name="arrow" size={15} /></button></div><div className="tip"><span>💡</span><span><strong>Daily tip</strong> — Review one solved problem before starting a new one.</span></div></article>
    </section>
  </div>
}

function PanelHeading({ title, subtitle, action, onAction }: { title: string; subtitle: string; action?: string; onAction?: () => void }) {
  return <div className="panel-heading"><div><h2>{title}</h2><p>{subtitle}</p></div>{action && <button type="button" className="text-button" onClick={onAction}>{action} <Icon name="arrow" size={14} /></button>}</div>
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return <div><span className={`legend-dot ${color}`} /><span>{label}</span><strong>{value}</strong></div>
}

function Stat({ onClick, className, label, value, total, detail, icon, progress }: { onClick: () => void; className: string; label: string; value: string; total?: string; detail: string; icon: 'bookmark' | 'code' | 'briefcase' | 'layers'; progress?: number }) {
  return <button type="button" className={`stat-card ${className}`} onClick={onClick}><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon name={icon} size={18} /></div></div><strong>{value} <small>{total}</small></strong><p><span className="positive">{detail.split('  ')[0]}</span> <span>{detail.split('  ')[1]}</span></p>{progress !== undefined ? <div className="progress-track"><i style={{ width: `${progress}%` }} /></div> : <div className="mini-bars purple-bars"><i /><i /><i /><i /><i /><i /><i /></div>}</button>
}

function readQuestions(): Question[] {
  const stored = localStorage.getItem(questionsStorageKey)
  if (!stored) return []
  try {
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed as Question[] : []
  } catch {
    return []
  }
}

function activityColor(category: Question['category']) {
  return category === 'DSA' ? 'purple' : category === 'Git' ? 'orange' : 'blue'
}

function activityIcon(category: Question['category']) {
  return category === 'DSA' ? 'code' : category === 'Git' ? 'layers' : 'briefcase'
}

function formatRelativeTime(createdAt?: string) {
  if (!createdAt) return 'Added recently'
  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - Date.parse(createdAt)) / 60000))
  if (elapsedMinutes < 1) return 'Just now'
  if (elapsedMinutes < 60) return `${elapsedMinutes} min ago`
  const elapsedHours = Math.floor(elapsedMinutes / 60)
  if (elapsedHours < 24) return `${elapsedHours} hr ago`
  const elapsedDays = Math.floor(elapsedHours / 24)
  return elapsedDays === 1 ? 'Yesterday' : `${elapsedDays} days ago`
}

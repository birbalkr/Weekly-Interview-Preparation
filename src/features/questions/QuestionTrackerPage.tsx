import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { Icon } from '../../shared/Icon'

type Category = 'DSA' | 'Git' | 'Technical'
type Difficulty = 'Easy' | 'Medium' | 'Hard'
type Status = 'Pending' | 'In Progress' | 'Completed'
type Question = { id: number; title: string; category: Category; difficulty: Difficulty; status: Status; resourceUrl?: string; createdAt?: string }
const questionsStorageKey = 'preply-questions-v2'

export function QuestionTrackerPage() {
  const [searchParams] = useSearchParams()
  const focus = searchParams.get('focus')
  const [questions, setQuestions] = useState<Question[]>(() => {
    const stored = localStorage.getItem(questionsStorageKey)
    if (!stored) return []
    try {
      const parsed: unknown = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed as Question[] : []
    } catch {
      return []
    }
  })
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('DSA')
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium')
  const [status, setStatus] = useState<Status>('Pending')
  const [resourceUrl, setResourceUrl] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [statusFilter, setStatusFilter] = useState(() => {
    const value = searchParams.get('status')
    return value === 'Pending' || value === 'In Progress' || value === 'Completed' ? value : 'All statuses'
  })
  const [difficultyFilter, setDifficultyFilter] = useState('All difficulties')
  const [search, setSearch] = useState(() => searchParams.get('search') ?? '')
  const [validationError, setValidationError] = useState('')
  const resourceLabel = category === 'DSA' ? 'LeetCode link' : 'GitHub doc link'

  useEffect(() => {
    localStorage.setItem(questionsStorageKey, JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    setCategoryFilter(categoryParam === 'DSA' || categoryParam === 'Git' || categoryParam === 'Technical' ? categoryParam : 'All categories')
    setSearch(searchParams.get('search') ?? '')
    const statusParam = searchParams.get('status')
    setStatusFilter(statusParam === 'Pending' || statusParam === 'In Progress' || statusParam === 'Completed' ? statusParam : 'All statuses')
  }, [searchParams])

  const filteredQuestions = useMemo(() => questions.filter((question) =>
    question.title.toLowerCase().includes(search.trim().toLowerCase()) &&
    (categoryFilter === 'All categories' || question.category === categoryFilter) &&
    (statusFilter === 'All statuses' || question.status === statusFilter) &&
    (difficultyFilter === 'All difficulties' || question.difficulty === difficultyFilter),
  ), [categoryFilter, difficultyFilter, questions, search, statusFilter])

  const addQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setValidationError('Enter a question before adding it.')
      return
    }
    const trimmedUrl = resourceUrl.trim()
    if (trimmedUrl) {
      try {
        const parsedUrl = new URL(trimmedUrl)
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') throw new Error('Unsupported protocol')
      } catch {
        setValidationError(`Enter a valid ${resourceLabel.toLowerCase()} starting with https://.`)
        return
      }
    }
    setValidationError('')
    setQuestions((current) => [{ id: Date.now(), title: trimmedTitle, category, difficulty, status, resourceUrl: trimmedUrl || undefined, createdAt: new Date().toISOString() }, ...current])
    setTitle('')
    setCategory('DSA')
    setDifficulty('Medium')
    setStatus('Pending')
    setResourceUrl('')
  }

  const updateStatus = (id: number, nextStatus: Status) => {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, status: nextStatus } : question))
  }

  const completed = questions.filter((question) => question.status === 'Completed').length

  const pageTitle = focus === 'machine' ? 'Machine coding' : categoryFilter === 'DSA' ? 'DSA Practice' : categoryFilter === 'Technical' ? 'Interview Prep' : 'Question tracker'
  const pageDescription = focus === 'machine' ? 'Practice and organize your machine-coding interview exercises.' : categoryFilter === 'DSA' ? 'Track your algorithm and data-structure problems.' : categoryFilter === 'Technical' ? 'Keep your technical interview preparation organized.' : 'Organize questions by topic, difficulty, and progress.'

  return <div className={`page-content tracker-page tracker-page-${focus === 'machine' ? 'machine-coding' : categoryFilter.toLowerCase()}`}>
    <section className="tracker-header"><div><p className="eyebrow">YOUR PREPARATION LIBRARY</p><h1>{pageTitle}</h1><p className="intro">{pageDescription}</p></div><div className="tracker-summary"><strong>{questions.length}</strong><span>Total questions</span><b>{completed}</b><span>Completed</span></div></section>
    <section className="tracker-layout">
      <form className="panel add-question-panel" onSubmit={addQuestion}>
        <div className="panel-heading"><div><h2>Add a question</h2><p>Keep your preparation list up to date</p></div><div className="add-symbol">+</div></div>
        <label className="field-label" htmlFor="question-title">Question</label>
        <input id="question-title" className="tracker-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Binary tree traversal" required />
        <div className="form-grid">
          <Field label="Category" value={category} onChange={(value) => setCategory(value as Category)} options={['DSA', 'Git', 'Technical']} />
          <Field label="Difficulty" value={difficulty} onChange={(value) => setDifficulty(value as Difficulty)} options={['Easy', 'Medium', 'Hard']} />
        </div>
        <label className="field-label" htmlFor="resource-url">{resourceLabel}<span className="optional-label">Optional</span></label>
        <input id="resource-url" className="tracker-input" type="url" value={resourceUrl} onChange={(event) => setResourceUrl(event.target.value)} placeholder={category === 'DSA' ? 'https://leetcode.com/problems/...' : 'https://github.com/your-name/docs/...'} />
        <label className="field-label" htmlFor="question-status">Status</label>
        <select id="question-status" className="tracker-input" value={status} onChange={(event) => setStatus(event.target.value as Status)}><option>Pending</option><option>In Progress</option><option>Completed</option></select>
        {validationError && <p className="form-error" role="alert">{validationError}</p>}<button className="primary-button add-question-button" type="submit"><span>+</span> Add question</button>
      </form>
      <div className="panel questions-panel">
        <div className="panel-heading questions-heading"><div><h2>All questions</h2><p>Track every question in one place</p></div><span className="question-count">{filteredQuestions.length} shown</span></div>
        <div className="filter-row"><label className="tracker-search"><Icon name="search" size={15} /><input aria-label="Search questions" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions..." /></label><Filter value={categoryFilter} onChange={setCategoryFilter} options={['All categories', 'DSA', 'Git', 'Technical']} /><Filter value={difficultyFilter} onChange={setDifficultyFilter} options={['All difficulties', 'Easy', 'Medium', 'Hard']} /><Filter value={statusFilter} onChange={setStatusFilter} options={['All statuses', 'Pending', 'In Progress', 'Completed']} /></div>
        <div className="question-table"><div className="question-table-head"><span>Question</span><span>Category</span><span>Difficulty</span><span>Status</span><span>Resource</span></div>{filteredQuestions.length ? filteredQuestions.map((question) => <div className="question-row" key={question.id}><strong>{question.title}</strong><span className={`category-pill ${question.category.toLowerCase()}`}>{question.category}</span><span className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span><select aria-label={`Status for ${question.title}`} className={`status-select ${question.status.toLowerCase().replace(' ', '-')}`} value={question.status} onChange={(event) => updateStatus(question.id, event.target.value as Status)}><option>Pending</option><option>In Progress</option><option>Completed</option></select>{question.resourceUrl ? <a className="resource-link" href={question.resourceUrl} target="_blank" rel="noreferrer">Open link <Icon name="arrow" size={12} /></a> : <span className="no-resource">—</span>}</div>) : <div className="empty-questions">{questions.length === 0 ? 'No questions yet. Add your first question to start tracking.' : 'No questions match your search and filters.'}</div>}</div>
      </div>
    </section>
  </div>
}

function Field({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="field-label">{label}<select className="tracker-input" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function Filter({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return <select className="filter-select" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select>
}

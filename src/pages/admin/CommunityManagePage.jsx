import { useState } from "react";
import {
  Box, Typography, Tabs, Tab, Card, CardContent, Chip, Switch,
  FormControlLabel, Button, IconButton, Avatar, Badge, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, FormControl, InputLabel, Stack, Grid,
  List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,
  Tooltip, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, ToggleButtonGroup, ToggleButton, Alert, Collapse
} from "@mui/material";
import {
  BarChart, People, QuestionAnswer, Shield, Groups,
  CheckCircle, Schedule, Flag, Lock, Public, School,
  Star, ThumbUp, NotificationsActive, Add, Edit, Delete,
  Visibility, VisibilityOff, PushPin, Close, OpenInNew,
  KeyboardArrowDown, KeyboardArrowRight, EmojiEvents,
  AdminPanelSettings, SupervisedUserCircle, PersonOff,
  TrendingUp, HowToVote, AutoAwesome, Gavel
} from "@mui/icons-material";

const theme = {
  primary: "#5C6BC0",
  secondary: "#26A69A",
  warning: "#FFA726",
  danger: "#EF5350",
  success: "#66BB6A",
  purple: "#AB47BC",
  bg: "#F8F9FC",
  card: "#FFFFFF",
  border: "#E8EAF0",
};

const ROLES = {
  super_admin: { label: "Super admin", color: "error", icon: <AdminPanelSettings fontSize="small" /> },
  community_admin: { label: "Community admin", color: "primary", icon: <Shield fontSize="small" /> },
  instructor: { label: "Instructor", color: "secondary", icon: <School fontSize="small" /> },
  moderator: { label: "Moderator", color: "warning", icon: <Gavel fontSize="small" /> },
  student: { label: "Student", color: "default", icon: <People fontSize="small" /> },
};

const COMMUNITIES = [
  { id: 1, name: "React JS — From Zero to Hero", type: "course", members: 134, questions: 87, answeredBy: "admin", moderation: true, requireApproval: true, icon: "⚛️" },
  { id: 2, name: "Node.js & Express API", type: "course", members: 89, questions: 53, answeredBy: "students", moderation: true, requireApproval: true, icon: "🟩" },
  { id: 3, name: "MongoDB Mastery", type: "course", members: 62, questions: 31, answeredBy: "admin", moderation: false, requireApproval: false, icon: "🍃" },
  { id: 4, name: "General Tech Q&A", type: "public", members: 981, questions: 208, answeredBy: "students", moderation: true, requireApproval: false, icon: "🌐" },
  { id: 5, name: "Arabic Dev Community", type: "public", members: 412, questions: 95, answeredBy: "admin", moderation: true, requireApproval: true, icon: "🌟" },
];

const QUESTIONS = [
  { id: 1, title: "كيف أصلح مشكلة CORS بين React وExpress؟", community: "Node.js & Express API", communityType: "course", author: "Ahmed", role: "student", time: "3m ago", answers: 0, status: "pending", votes: 0 },
  { id: 2, title: "What is the difference between useEffect and useLayoutEffect?", community: "React JS — From Zero to Hero", communityType: "course", author: "Sara", role: "student", time: "2h ago", answers: 1, answeredBy: "Admin", status: "answered", votes: 4 },
  { id: 3, title: "Best way to structure MongoDB schemas for multi-tenant SaaS?", community: "General Tech Q&A", communityType: "public", author: "Khaled", role: "student", time: "5h ago", answers: 3, status: "open", votes: 12 },
  { id: 4, title: "Why does JWT expire immediately on mobile devices?", community: "Node.js & Express API", communityType: "course", author: "Omar", role: "student", time: "1d ago", answers: 0, status: "flagged", votes: 2 },
  { id: 5, title: "How to implement RTK Query with pagination?", community: "React JS — From Zero to Hero", communityType: "course", author: "Layla", role: "student", time: "2d ago", answers: 2, answeredBy: "Instructor", status: "answered", votes: 8 },
  { id: 6, title: "Socket.io rooms for multi-tenant chat — best pattern?", community: "General Tech Q&A", communityType: "public", author: "Hassan", role: "student", time: "3d ago", answers: 1, status: "open", votes: 6 },
];

const MEMBERS = [
  { id: 1, name: "Ahmed Mostafa", email: "ahmed@example.com", role: "student", points: 120, communities: 2, status: "active" },
  { id: 2, name: "Sara Khalil", email: "sara@example.com", role: "instructor", points: 0, communities: 3, status: "active" },
  { id: 3, name: "Khaled Ibrahim", email: "khaled@example.com", role: "moderator", points: 340, communities: 4, status: "active" },
  { id: 4, name: "Omar Sherif", email: "omar@example.com", role: "student", points: 45, communities: 1, status: "active" },
  { id: 5, name: "Layla Hassan", email: "layla@example.com", role: "community_admin", points: 0, communities: 2, status: "active" },
];

const statusMeta = {
  pending: { label: "Pending", color: "warning" },
  open: { label: "Open", color: "default" },
  answered: { label: "Answered", color: "success" },
  flagged: { label: "Flagged", color: "error" },
  closed: { label: "Closed", color: "default" },
};

function StatCard({ icon, value, label, color = theme.primary }) {
  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3, flex: 1, minWidth: 120 }}>
      <CardContent sx={{ p: "14px 16px !important" }}>
        <Box sx={{ color, mb: 0.5 }}>{icon}</Box>
        <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1.1, color }}>{value}</Typography>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
      </CardContent>
    </Card>
  );
}

function RoleBadge({ role }) {
  const r = ROLES[role] || ROLES.student;
  return (
    <Chip
      icon={r.icon}
      label={r.label}
      color={r.color}
      size="small"
      variant="outlined"
      sx={{ fontWeight: 500, fontSize: 11 }}
    />
  );
}

function PermissionToggle({ label, description, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.2, borderBottom: `1px solid ${theme.border}` }}>
      <Box>
        <Typography variant="body2" fontWeight={500}>{label}</Typography>
        {description && <Typography variant="caption" color="text.secondary">{description}</Typography>}
      </Box>
      <Switch checked={on} onChange={e => setOn(e.target.checked)} color="primary" size="small" />
    </Box>
  );
}

function OverviewTab() {
  return (
    <Box>
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
        <StatCard icon={<Groups />} value="12" label="Communities" color={theme.primary} />
        <StatCard icon={<QuestionAnswer />} value="474" label="Total questions" color={theme.secondary} />
        <StatCard icon={<Schedule />} value="27" label="Pending review" color={theme.warning} />
        <StatCard icon={<CheckCircle />} value="312" label="Answered" color={theme.success} />
        <StatCard icon={<People />} value="1,204" label="Students" color={theme.purple} />
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { icon: <Groups color="primary" />, title: "Multi-community", desc: "Course communities for enrolled students. Public communities for everyone. Each with independent settings." },
          { icon: <Shield color="success" />, title: "Role-based control", desc: "5 roles: super admin, community admin, instructor, moderator, student. All configurable per community." },
          { icon: <Schedule sx={{ color: theme.warning }} />, title: "Answer workflow", desc: "Questions wait for approval. Control who can answer per community. Auto-close after inactivity." },
          { icon: <EmojiEvents sx={{ color: theme.purple }} />, title: "Points & trust", desc: "Students earn points for accepted answers. Trust levels auto-unlock permissions as engagement grows." },
        ].map(f => (
          <Grid item xs={12} sm={6} key={f.title}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3, height: "100%" }}>
              <CardContent sx={{ p: "14px 16px !important" }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                  {f.icon}
                  <Typography variant="body2" fontWeight={600}>{f.title}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">{f.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: "block" }}>Recent activity</Typography>
      <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3 }}>
        {[
          { icon: <Add color="primary" />, text: <>New question in <b>React JS course</b> — awaiting admin answer</>, time: "2m ago" },
          { icon: <CheckCircle color="success" />, text: <>Answer marked accepted in <b>General Tech Q&A</b></>, time: "15m ago" },
          { icon: <Flag color="error" />, text: <>Question flagged in <b>Node.js course</b> — needs review</>, time: "1h ago" },
          { icon: <NotificationsActive sx={{ color: theme.warning }} />, text: <>New student joined <b>Arabic Dev Community</b></>, time: "3h ago" },
        ].map((a, i, arr) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.25, borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : "none" }}>
            {a.icon}
            <Typography variant="body2" sx={{ flex: 1 }}>{a.text}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{a.time}</Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
}

function CommunitiesTab() {
  const [communities, setCommunities] = useState(COMMUNITIES);
  const [openDialog, setOpenDialog] = useState(false);
  const [newComm, setNewComm] = useState({ name: "", type: "course", answeredBy: "admin" });

  const toggle = (id, field) => {
    setCommunities(c => c.map(x => x.id === id ? { ...x, [field]: !x[field] } : x));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Manage communities — each linked to a course or public
        </Typography>
        <Button variant="contained" startIcon={<Add />} size="small" sx={{ borderRadius: 2, textTransform: "none" }} onClick={() => setOpenDialog(true)}>
          New community
        </Button>
      </Box>

      {["course", "public"].map(type => (
        <Box key={type} sx={{ mb: 2.5 }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            {type === "course" ? "Course communities" : "Public communities"}
          </Typography>
          {communities.filter(c => c.type === type).map(c => (
            <Card key={c.id} elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3, mb: 1 }}>
              <CardContent sx={{ p: "12px 16px !important" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Typography fontSize={22}>{c.icon}</Typography>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{c.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {c.type === "course" ? "Enrolled students only" : "Open to all"} · {c.members} members
                      </Typography>
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Chip label={type === "course" ? "Course" : "Public"} color={type === "course" ? "primary" : "secondary"} size="small" variant="outlined" />
                  </Stack>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 1.25, flexWrap: "wrap", alignItems: "center" }}>
                  <Chip icon={<QuestionAnswer />} label={`${c.questions} questions`} size="small" variant="outlined" />
                  <Chip
                    label={c.answeredBy === "admin" ? "Admin-only answers" : "Students can answer"}
                    color={c.answeredBy === "admin" ? "default" : "warning"}
                    size="small"
                    onClick={() => setCommunities(cs => cs.map(x => x.id === c.id ? { ...x, answeredBy: x.answeredBy === "admin" ? "students" : "admin" } : x))}
                    sx={{ cursor: "pointer" }}
                  />
                  <Tooltip title="Toggle question approval">
                    <Chip
                      icon={c.requireApproval ? <Lock fontSize="small" /> : <Visibility fontSize="small" />}
                      label={c.requireApproval ? "Approval on" : "Auto-publish"}
                      size="small"
                      color={c.requireApproval ? "default" : "success"}
                      onClick={() => toggle(c.id, "requireApproval")}
                      sx={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                  <Tooltip title="Toggle moderation">
                    <Chip
                      icon={c.moderation ? <Shield fontSize="small" /> : <PersonOff fontSize="small" />}
                      label={c.moderation ? "Moderated" : "Unmoderated"}
                      size="small"
                      color={c.moderation ? "primary" : "error"}
                      variant="outlined"
                      onClick={() => toggle(c.id, "moderation")}
                      sx={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>New community</DialogTitle>
        <DialogContent sx={{ pt: "12px !important" }}>
          <Stack spacing={2}>
            <TextField label="Community name" fullWidth size="small" value={newComm.name} onChange={e => setNewComm(n => ({ ...n, name: e.target.value }))} />
            <FormControl size="small" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select label="Type" value={newComm.type} onChange={e => setNewComm(n => ({ ...n, type: e.target.value }))}>
                <MenuItem value="course">Course community (enrolled only)</MenuItem>
                <MenuItem value="public">Public community (open to all)</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Who can answer</InputLabel>
              <Select label="Who can answer" value={newComm.answeredBy} onChange={e => setNewComm(n => ({ ...n, answeredBy: e.target.value }))}>
                <MenuItem value="admin">Admin & instructors only</MenuItem>
                <MenuItem value="students">Students can also answer</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenDialog(false)} size="small" sx={{ textTransform: "none" }}>Cancel</Button>
          <Button variant="contained" size="small" sx={{ textTransform: "none", borderRadius: 2 }} onClick={() => {
            if (newComm.name.trim()) {
              setCommunities(c => [...c, { id: Date.now(), ...newComm, members: 0, questions: 0, moderation: true, requireApproval: true, icon: "📚" }]);
              setNewComm({ name: "", type: "course", answeredBy: "admin" });
              setOpenDialog(false);
            }
          }}>Create community</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function QuestionsTab() {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterComm, setFilterComm] = useState("all");

  const updateStatus = (id, status) => setQuestions(qs => qs.map(q => q.id === id ? { ...q, status } : q));

  const filtered = questions.filter(q => {
    if (filterStatus !== "all" && q.status !== filterStatus) return false;
    if (filterComm !== "all" && q.community !== filterComm) return false;
    return true;
  });

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }} useFlexGap>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <MenuItem value="all">All statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="answered">Answered</MenuItem>
            <MenuItem value="flagged">Flagged</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Community</InputLabel>
          <Select label="Community" value={filterComm} onChange={e => setFilterComm(e.target.value)}>
            <MenuItem value="all">All communities</MenuItem>
            {[...new Set(QUESTIONS.map(q => q.community))].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <Box sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>{filtered.length} questions</Typography>
      </Stack>

      <Stack spacing={1}>
        {filtered.map(q => (
          <Card key={q.id} elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3, "&:hover": { borderColor: theme.primary } }}>
            <CardContent sx={{ p: "12px 16px !important" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                <Typography variant="body2" fontWeight={600} sx={{ flex: 1, direction: q.title.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr" }}>{q.title}</Typography>
                <Chip label={statusMeta[q.status]?.label} color={statusMeta[q.status]?.color} size="small" />
              </Box>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }} useFlexGap alignItems="center">
                <Chip
                  icon={q.communityType === "course" ? <School fontSize="small" /> : <Public fontSize="small" />}
                  label={q.community}
                  size="small"
                  color={q.communityType === "course" ? "primary" : "secondary"}
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">by {q.author} · {q.time}</Typography>
                <Typography variant="caption" color="text.secondary">·</Typography>
                <Typography variant="caption" color="text.secondary">{q.answers} answers{q.answeredBy ? ` · by ${q.answeredBy}` : ""}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.25}>
                  <ThumbUp sx={{ fontSize: 12, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">{q.votes}</Typography>
                </Stack>
              </Stack>

              {(q.status === "pending" || q.status === "flagged") && (
                <Stack direction="row" spacing={0.75} sx={{ mt: 1.25 }}>
                  {q.status === "pending" && <>
                    <Button size="small" variant="contained" sx={{ textTransform: "none", borderRadius: 2, fontSize: 11 }} onClick={() => updateStatus(q.id, "open")}>Approve</Button>
                    <Button size="small" variant="outlined" sx={{ textTransform: "none", borderRadius: 2, fontSize: 11 }}>Approve & answer</Button>
                    <Button size="small" color="error" variant="outlined" sx={{ textTransform: "none", borderRadius: 2, fontSize: 11 }} onClick={() => updateStatus(q.id, "closed")}>Reject</Button>
                  </>}
                  {q.status === "flagged" && <>
                    <Button size="small" variant="outlined" sx={{ textTransform: "none", borderRadius: 2, fontSize: 11 }} onClick={() => updateStatus(q.id, "open")}>Keep & reopen</Button>
                    <Button size="small" color="error" variant="outlined" sx={{ textTransform: "none", borderRadius: 2, fontSize: 11 }} onClick={() => updateStatus(q.id, "closed")}>Close question</Button>
                  </>}
                </Stack>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

function PermissionsTab() {
  return (
    <Box>
      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
        These are global defaults. Each community can override them independently from the Communities tab.
      </Alert>

      {[
        {
          title: "Who can ask questions",
          items: [
            { label: "Students can post questions", desc: "Applies globally unless a community overrides", on: true },
            { label: "Require question approval before visible", desc: "Question hidden until admin approves", on: true },
            { label: "Students can attach images", on: true },
            { label: "Students can use code blocks", on: true },
            { label: "Students can tag questions", desc: "Add topic tags to help with search and filtering", on: false },
          ]
        },
        {
          title: "Who can answer",
          items: [
            { label: "Admins can always answer", desc: "Always enabled — the default answerer role", on: true },
            { label: "Instructors can answer", desc: "Teachers assigned to that community", on: true },
            { label: "Moderators can answer", desc: "Off by default — enable per community", on: false },
            { label: "Students can answer (global default)", desc: "Each community can override this independently", on: false },
            { label: "Student answers require approval", desc: "Show only after admin or instructor approves", on: true },
            { label: "Trust level unlocks student answers", desc: "Students with 200+ points answer freely without approval", on: false },
          ]
        },
        {
          title: "Moderation",
          items: [
            { label: "Students can flag questions/answers", on: true },
            { label: "Students can upvote / downvote", on: true },
            { label: "Only admin can mark answer as accepted", on: true },
            { label: "Students can suggest edits to questions", on: false },
            { label: "Auto-close unanswered after 14 days", desc: "Question archived if no answer in 14 days", on: true },
          ]
        },
        {
          title: "Notifications",
          items: [
            { label: "Notify admins on new question", desc: "Email + in-app notification to assigned admins", on: true },
            { label: "Notify student when their question is answered", on: true },
            { label: "Notify when answer is accepted", on: true },
            { label: "Weekly digest for unanswered questions", desc: "Remind admins of pending questions every Monday", on: false },
          ]
        },
      ].map(section => (
        <Box key={section.title} sx={{ mb: 2.5 }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>{section.title}</Typography>
          <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3, px: 2 }}>
            {section.items.map((item, i, arr) => (
              <Box key={item.label} sx={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : "none" }}>
                <PermissionToggle label={item.label} description={item.desc} defaultOn={item.on} />
              </Box>
            ))}
          </Card>
        </Box>
      ))}
    </Box>
  );
}

function RolesTab() {
  const [members, setMembers] = useState(MEMBERS);

  const trustLevel = (pts) => pts >= 200 ? { label: "Trusted", color: "secondary" } : pts >= 50 ? { label: "Member", color: "primary" } : { label: "Newcomer", color: "default" };

  const changeRole = (id, role) => setMembers(m => m.map(x => x.id === id ? { ...x, role } : x));

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { role: "super_admin", desc: "Full system access. Manages all communities, roles, and global permission defaults.", perms: ["Manage all communities", "Assign any role", "Override all settings", "Delete any content"] },
          { role: "community_admin", desc: "Manages one or more communities. Approves content, toggles student permissions.", perms: ["Approve/reject questions", "Toggle student answers", "Assign moderators", "Pin questions"] },
          { role: "instructor", desc: "Linked to course communities. Answers questions, marks accepted answers.", perms: ["Answer questions", "Mark answer as accepted", "Pin answers", "View student profiles"] },
          { role: "moderator", desc: "Flags, hides, and moves questions. Promoted from trusted students.", perms: ["Flag/hide content", "Move questions", "Close flagged questions", "Cannot delete"] },
          { role: "student", desc: "Base role. Ask questions, earn trust points. Permissions expand with engagement.", perms: ["Ask questions", "Vote (if enabled)", "Answer (if enabled)", "Earn trust points"] },
        ].map(r => {
          const meta = ROLES[r.role];
          return (
            <Grid item xs={12} sm={6} key={r.role}>
              <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3, height: "100%", borderLeft: `3px solid` }}>
                <CardContent sx={{ p: "12px 16px !important" }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                    <RoleBadge role={r.role} />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>{r.desc}</Typography>
                  <Stack spacing={0.4}>
                    {r.perms.map(p => (
                      <Stack key={p} direction="row" spacing={0.75} alignItems="center">
                        <CheckCircle sx={{ fontSize: 12, color: theme.success }} />
                        <Typography variant="caption">{p}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 1 }}>Trust level system</Typography>
          <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3 }}>
            <CardContent sx={{ p: "14px 16px !important" }}>
              <Grid container spacing={2}>
                {[
                  { range: "0–49 pts", level: "Newcomer", color: "default", perms: "Can ask questions only", progress: 20 },
                  { range: "50–199 pts", level: "Member", color: "primary", perms: "Can vote + answer (if enabled)", progress: 55 },
                  { range: "200+ pts", level: "Trusted", color: "secondary", perms: "Answers auto-approved, can be promoted to moderator", progress: 100 },
                ].map(t => (
                  <Grid item xs={12} sm={4} key={t.level}>
                    <Box sx={{ p: 1.5, background: theme.bg, borderRadius: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Chip label={t.level} color={t.color} size="small" />
                        <Typography variant="caption" fontWeight={600}>{t.range}</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={t.progress} color={t.color} sx={{ borderRadius: 4, mb: 0.75, height: 6 }} />
                      <Typography variant="caption" color="text.secondary">{t.perms}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 1 }}>Manage members & roles</Typography>
      <Card elevation={0} sx={{ border: `1px solid ${theme.border}`, borderRadius: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 600, fontSize: 12, color: "text.secondary", borderBottom: `1px solid ${theme.border}` } }}>
                <TableCell>Member</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Trust points</TableCell>
                <TableCell>Communities</TableCell>
                <TableCell>Change role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map(m => (
                <TableRow key={m.id} sx={{ "&:last-child td": { border: 0 }, "& td": { py: 1.25, borderBottom: `1px solid ${theme.border}` } }}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: theme.primary }}>{m.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>{m.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{m.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell><RoleBadge role={m.role} /></TableCell>
                  <TableCell>
                    {m.role === "student" || m.role === "moderator" ? (
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <Typography variant="body2">{m.points}</Typography>
                        <Chip label={trustLevel(m.points).label} color={trustLevel(m.points).color} size="small" variant="outlined" />
                      </Stack>
                    ) : <Typography variant="caption" color="text.secondary">N/A</Typography>}
                  </TableCell>
                  <TableCell><Typography variant="body2">{m.communities}</Typography></TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 130 }}>
                      <Select value={m.role} onChange={e => changeRole(m.id, e.target.value)} sx={{ fontSize: 12 }}>
                        {Object.entries(ROLES).map(([key, val]) => (
                          <MenuItem key={key} value={key} sx={{ fontSize: 12 }}>{val.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default function CommunityManagePage() {
  const [tab, setTab] = useState(0);

  const tabs = [
    { label: "Overview", icon: <BarChart fontSize="small" /> },
    { label: "Communities", icon: <Groups fontSize="small" /> },
    { label: "Questions", icon: <QuestionAnswer fontSize="small" /> },
    { label: "Permissions", icon: <Shield fontSize="small" /> },
    { label: "Roles & Members", icon: <SupervisedUserCircle fontSize="small" /> },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.bg, p: { xs: 1.5, sm: 3 } }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: theme.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <QuestionAnswer sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>Community Q&A</Typography>
              <Typography variant="caption" color="text.secondary">Admin control panel</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: `1px solid ${theme.border}`, mb: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 40,
              "& .MuiTab-root": { minHeight: 40, textTransform: "none", fontSize: 13, fontWeight: 500, px: 1.5 },
              "& .MuiTabs-indicator": { bgcolor: theme.primary }
            }}
          >
            {tabs.map((t, i) => (
              <Tab key={i} label={t.label} icon={t.icon} iconPosition="start" />
            ))}
          </Tabs>
        </Box>

        {/* Tab content */}
        {tab === 0 && <OverviewTab />}
        {tab === 1 && <CommunitiesTab />}
        {tab === 2 && <QuestionsTab />}
        {tab === 3 && <PermissionsTab />}
        {tab === 4 && <RolesTab />}
      </Box>
    </Box>
  );
}
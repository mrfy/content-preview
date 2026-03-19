<template>
  <div class="space-y-3">
    <!-- Template gallery -->
    <div>
      <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-2">Templates</h4>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="(tpl, i) in templates"
          :key="tpl.name"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          :class="activeTemplate === i
            ? 'bg-indigo-100 text-indigo-700'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          :title="tpl.description"
          @click="selectTemplate(i)"
        >
          {{ tpl.name }}
        </button>
        <button
          v-if="htmlContent && !showUndo"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-400 transition-colors"
          @click="clearWithUndo"
        >
          Clear
        </button>
        <button
          v-if="showUndo"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          @click="undoClear"
        >
          Undo
        </button>
      </div>
    </div>

    <!-- HTML editor -->
    <ClientOnly>
      <div v-show="editorReady" ref="editorContainer" />
      <textarea
        v-show="!editorReady"
        v-model="htmlContent"
        placeholder="Paste your HTML email code here..."
        spellcheck="false"
        class="w-full min-h-[350px] p-4 rounded-xl border border-slate-200 bg-slate-50/50 font-mono text-[13px] text-slate-700 leading-relaxed placeholder:text-slate-300 resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 focus:bg-white"
      />
      <template #fallback>
        <textarea
          v-model="htmlContent"
          placeholder="Paste your HTML email code here..."
          spellcheck="false"
          class="w-full min-h-[350px] p-4 rounded-xl border border-slate-200 bg-slate-50/50 font-mono text-[13px] text-slate-700 leading-relaxed placeholder:text-slate-300 resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 focus:bg-white"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { htmlContent, templates, loadTemplate, clear } = useEmailPreview()

const activeTemplate = ref<number | null>(null)
const savedHtml = ref('')
const showUndo = ref(false)
let undoTimer: ReturnType<typeof setTimeout> | null = null

function selectTemplate(i: number) {
  activeTemplate.value = i
  loadTemplate(i)
}

function clearWithUndo() {
  savedHtml.value = htmlContent.value
  activeTemplate.value = null
  clear()
  showUndo.value = true
  if (undoTimer) clearTimeout(undoTimer)
  undoTimer = setTimeout(() => { showUndo.value = false }, 3000)
}

function undoClear() {
  htmlContent.value = savedHtml.value
  showUndo.value = false
  if (undoTimer) clearTimeout(undoTimer)
}

watch(htmlContent, (val) => {
  if (!val) activeTemplate.value = null
})

// CodeMirror integration
const editorContainer = ref<HTMLElement | null>(null)
const editorReady = ref(false)
let editorView: any = null
let ignoreNextUpdate = false

onMounted(async () => {
  try {
    const [cmModule, htmlModule, cmViewModule] = await Promise.all([
      import('codemirror'),
      import('@codemirror/lang-html'),
      import('@codemirror/view'),
    ])

    const { EditorState } = await import('@codemirror/state')

    if (!editorContainer.value) return

    const updateListener = cmViewModule.EditorView.updateListener.of((update: any) => {
      if (update.docChanged) {
        ignoreNextUpdate = true
        htmlContent.value = update.state.doc.toString()
      }
    })

    const theme = cmViewModule.EditorView.theme({
      '&': {
        minHeight: '350px',
        maxHeight: '600px',
        fontSize: '13px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      },
      '.cm-scroller': {
        overflow: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
        lineHeight: '1.6',
      },
      '.cm-content': {
        padding: '16px',
      },
      '&.cm-focused': {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
        borderColor: '#a5b4fc',
      },
    })

    const state = EditorState.create({
      doc: htmlContent.value,
      extensions: [
        cmModule.basicSetup,
        htmlModule.html(),
        updateListener,
        theme,
        cmViewModule.EditorView.lineWrapping,
      ],
    })

    editorView = new cmViewModule.EditorView({
      state,
      parent: editorContainer.value,
    })

    editorReady.value = true

    watch(htmlContent, (val) => {
      if (ignoreNextUpdate) {
        ignoreNextUpdate = false
        return
      }
      if (editorView && editorView.state.doc.toString() !== val) {
        editorView.dispatch({
          changes: { from: 0, to: editorView.state.doc.length, insert: val },
        })
      }
    })
  } catch {
    // CodeMirror failed to load, textarea fallback stays visible
  }
})

onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy()
    editorView = null
  }
})
</script>

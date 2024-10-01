---
title: "Vim config"
subtitle: "Basic Vim setup to start Competitive Programming"
date: "2024-01-19"
---

# Basic vim setup

```vim
syntax on
```

- `syntax on` enables syntax highlighting in Vim. This highlights different elements of your code with different colors to make it more readable and easier to understand.

```vim
filetype plugin indent on
```

- `filetype plugin indent on` enables file type detection, which allows Vim to automatically detect the type of file you are editing and apply appropriate settings and plugins for that file type. It also enables automatic indentation based on the file type.

```vim
set modelines=0
```

- `set modelines=0` disables the reading of modelines. Modelines are special comments in a file that can be used to specify settings for that file. Setting this to 0 means Vim won't read and apply settings from modelines.

```vim
set number
```

- `set number` displays line numbers on the left side of the editor, making it easier to reference specific lines in the file.

```vim
set ruler
```

- `set ruler` displays the current line and column number in the status line at the bottom of the Vim window.

```vim
set visualbell
```

- `set visualbell` replaces the audible bell with a visual bell. When an error or warning occurs, Vim will flash the screen instead of producing a sound.

```vim
set encoding=utf-8
```

- `set encoding=utf-8` sets the character encoding to UTF-8, which is a widely used encoding for handling a wide range of characters from different languages.

```vim
set wrap
```

- `set wrap` enables line wrapping, causing long lines to wrap to the next line if they exceed the screen width.

```vim
set textwidth=79
```

- `set textwidth=79` sets the maximum line width to 79 characters. This can be useful for ensuring that your code conforms to a specific line length limit.

```vim
set formatoptions=tcqrn1
```

- `set formatoptions=tcqrn1` sets various formatting options for auto-indentation and text formatting. These options control how Vim formats text as you type.

```vim
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
set noshiftround
```

- These lines configure indentation settings. They set the tab width to 2 spaces, the number of spaces to use for each level of indentation, and configure tabs to be expanded as spaces.

```vim
" Cursor motion
set scrolloff=3
```

- `set scrolloff=3` configures Vim to keep at least 3 lines of context when scrolling up or down. This helps maintain context while navigating through the file.

```vim
set backspace=indent,eol,start
```

- `set backspace=indent,eol,start` allows you to use the Backspace key to delete characters beyond the current indent, at the end of a line, and at the start of insert mode.

```vim
set matchpairs+=<:>
runtime! macros/matchit.vim
```

- These lines configure matching pairs for brackets (`<:>`). It also loads the `matchit.vim` plugin, which enhances Vim's ability to jump between matching pairs of characters using the `%` key.

```vim
nnoremap j gj
nnoremap k gk
```

- These lines create non-recursive key mappings for `j` and `k` to make them move by display lines (`gj` and `gk`) instead of actual lines. This can be useful when working with wrapped lines.

```vim
set hidden
```

- `set hidden` allows you to switch between buffers without saving changes. Unsaved changes are preserved in the background.

```vim
set ttyfast
```

- `set ttyfast` optimizes Vim for faster terminal response.

```vim
" Status bar
set laststatus=2
```

- `set laststatus=2` ensures that the status bar is always displayed with at least two lines.

```vim
" Last line
set showmode
set showcmd
```

- These lines enable the display of the current mode (e.g., Normal, Insert) and show partial command input at the bottom of the screen.

```vim
" Searching
nnoremap / /\v
vnoremap / /\v
set hlsearch
set incsearch
set ignorecase
set smartcase
set showmatch
map <leader><space> :let @/=''<cr> " clear search
```

- These lines configure various aspects of searching and search highlighting in Vim. They also create key mappings for search-related commands and provide a mapping to clear the search pattern using `<leader><space>`.

```vim
" Visualize tabs and newlines
set listchars=tab:▸\ ,eol:¬
" Uncomment this to enable by default:
" set list " To enable by default
" Or use your leader key + l to toggle on/off
map <leader>l :set list!<CR> " Toggle tabs and EOL
```

- These lines configure how tabs and newlines are visualized. They use special characters to represent tabs (`▸`) and end-of-line characters (`¬`). Additionally, there's a key mapping to toggle the visualization of tabs and EOL characters using `<leader>l`.

This `.vimrc` file provides various settings and key mappings to enhance your Vim experience. You can customize it further to suit your preferences.

> [!NOTE] Note
> Paste the below code in vimrc file

```vim
syntax on
filetype plugin indent on
set modelines=0
set number
set ruler
set visualbell
set encoding=utf-8
set wrap
set textwidth=79
set formatoptions=tcqrn1
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
set noshiftround

" Cursor motion
set scrolloff=3
set backspace=indent,eol,start
set matchpairs+=<:>
runtime! macros/matchit.vim
nnoremap j gj
nnoremap k gk
set hidden
set ttyfast

" Status bar
set laststatus=2

" Last line
set showmode
set showcmd

" Searching
nnoremap / /\v
vnoremap / /\v
set hlsearch
set incsearch
set ignorecase
set smartcase
set showmatch
map <leader><space> :let @/=''<cr> " clear search

" Visualize tabs and newlines
set listchars=tab:▸\ ,eol:¬
" Uncomment this to enable by default:
" set list " To enable by default
" Or use your leader key + l to toggle on/off
map <leader>l :set list!<CR> " Toggle tabs and EOL
```

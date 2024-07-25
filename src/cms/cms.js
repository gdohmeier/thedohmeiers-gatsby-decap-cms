import CMS from 'decap-cms-app'
import uploadcare from 'decap-cms-media-library-uploadcare'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import GamesPagePreview from './preview-templates/GamesPagePreview-old'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('games', GamesPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

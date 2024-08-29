import CMS from 'decap-cms-app'
import uploadcare from 'decap-cms-media-library-uploadcare'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import GamesPostPreview from './preview-templates/GamesPostPreview'
import RanchPostPreview from './preview-templates/RanchPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('games', GamesPostPreview)
CMS.registerPreviewTemplate('ranch', RanchPostPreview)


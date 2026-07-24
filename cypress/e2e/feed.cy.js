describe('RSS feed', () => {
  beforeEach(() => {
    cy.request('/feed.xml').as('feed')
  })

  it('responds with RSS content type', function () {
    expect(this.feed.status).to.eq(200)
    expect(this.feed.headers['content-type']).to.eq('application/rss+xml; charset=utf-8')
  })

  it('is well-formed XML', function () {
    const doc = new DOMParser().parseFromString(this.feed.body, 'application/xml')

    expect(doc.querySelector('parsererror')).to.be.null
    expect(doc.documentElement.nodeName).to.eq('rss')
  })

  it('has a channel with items', function () {
    const doc = new DOMParser().parseFromString(this.feed.body, 'application/xml')

    expect(doc.querySelector('channel > title').textContent).to.eq('Ryan Rishi')
    expect(doc.querySelectorAll('channel > item').length).to.be.greaterThan(0)
  })

  it('each item has a title, an absolute link, and a valid pubDate', function () {
    const doc = new DOMParser().parseFromString(this.feed.body, 'application/xml')

    doc.querySelectorAll('channel > item').forEach((item) => {
      expect(item.querySelector('title').textContent).to.not.be.empty
      expect(item.querySelector('link').textContent).to.match(/^https:\/\/ryanrishi\.com\/blog\/.+/)
      expect(new Date(item.querySelector('pubDate').textContent).toString()).to.not.eq('Invalid Date')
    })
  })
})

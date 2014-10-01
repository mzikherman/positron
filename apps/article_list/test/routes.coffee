routes = require '../routes'
_ = require 'underscore'
Backbone = require 'backbone'
{ spooky } = require '../../../lib/apis'
sinon = require 'sinon'
fixtures = require '../../../test/helpers/fixtures'

describe 'routes', ->

  beforeEach ->
    sinon.stub spooky, 'get'
    @req = { query: {} }
    @res = { render: sinon.stub(), locals: sd: {} }

  afterEach ->
    spooky.get.restore()

  describe '#articles', ->

    it 'fetches a page of articles', ->
      routes.articles @req, @res
      _.last(spooky.get.args[0])(null, new Backbone.Collection [fixtures.article])
      _.last(@res.render.args[0][1].articles).get('title')
        .should.containEql 'art in'

    it 'pages', ->
      @req.query.page = 2
      routes.articles @req, @res
      spooky.get.args[0][1].should.equal 'articles.next.next.articles'

    it 'can filter based on state', ->
      @req.query.state = 1
      routes.articles @req, @res
      spooky.get.args[0][2].params.state.should.equal 1
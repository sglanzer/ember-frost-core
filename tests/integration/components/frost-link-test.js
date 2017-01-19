import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Integration: FrostLinkComponent', function () {
  setupComponentTest('frost-link', {
    integration: true
  })

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  describe('when instantiated with routeNames', function () {
    let props

    beforeEach(function () {
      props = {
        openLink: sandbox.spy()
      }

      this.setProperties(props)

      this.render(hbs`
        {{frost-link
          _openLink=openLink
          hook='myLink'
          routeNames=(array
            'link.min'
            'link.max'
          )
        }}
      `)
    })

    describe('when clicked', function () {
      beforeEach(function () {
        this.$('.frost-link').click()
      })

      it('opens correct number of links', function () {
        expect(props.openLink.callCount).to.equal(2)
      })

      it('opens first link as expected', function () {
        const actual = props.openLink.firstCall.args
        const expected = ['link.min', [], {}]
        expect(JSON.stringify(actual)).to.eql(JSON.stringify(expected))
      })

      it('opens second link as expected', function () {
        const actual = props.openLink.lastCall.args
        const expected = ['link.max', [], {}]
        expect(JSON.stringify(actual)).to.eql(JSON.stringify(expected))
      })
    })
  })

  describe('when instantiated with routes', function () {
    let props

    beforeEach(function () {
      props = {
        openLink: sandbox.spy()
      }

      this.setProperties(props)

      this.render(hbs`
        {{frost-link
          _openLink=openLink
          hook='myLink'
          routes=(array
            (hash
              name='link.first'
              models=(array '1')
            )
            (hash
              name='link.first.second'
              models=(array '2')
            )
          )
        }}
      `)
    })

    describe('when clicked', function () {
      beforeEach(function () {
        this.$('.frost-link').click()
      })

      it('opens correct number of links', function () {
        expect(props.openLink.callCount).to.equal(2)
      })

      it('opens first link as expected', function () {
        const actual = props.openLink.firstCall.args
        const expected = ['link.first', ['1'], {}]
        expect(JSON.stringify(actual)).to.eql(JSON.stringify(expected))
      })

      it('opens second link as expected', function () {
        const actual = props.openLink.lastCall.args
        const expected = ['link.first.second', ['2'], {}]
        expect(JSON.stringify(actual)).to.eql(JSON.stringify(expected))
      })
    })
  })

  it('renders default values', function () {
    this.render(hbs`
      {{frost-link 'title' 'testRoute' hook='myLink'}}
    `)

    expect(
      this.$('.frost-link'),
      'has the correct class'
    ).to.have.length(1)
  })

  it('yields content', function () {
    this.render(hbs`
      {{#frost-link 'testRoute' hook='myLink'}}
        Yielded title
      {{/frost-link}}
    `)

    expect(
      this.$('.frost-link').text().trim(),
      'Yields content'
    ).to.eql('Yielded title')
  })

  it('sets the link title', function () {
    const title = 'Title'

    this.set('title', title)

    this.render(hbs`
      {{frost-link title 'testRoute' hook='myLink'}}
    `)

    expect(
      this.$('.frost-link').text().trim(),
      'Link title is set'
    ).to.eql(title)
  })

  describe('RouteNames property', function () {
    it('target is not set', function () {
      this.render(hbs`
        {{frost-link 'title'
          hook='myLink'
          routeNames=(array 'testRoute')
          priority='primary'
        }}
      `)

      expect(
        this.$('.frost-link').prop('target'),
        'target should not be set set'
      ).to.equal('')
    })

    it('target is not set in block format', function () {
      this.render(hbs`
        {{#frost-link
          hook='myLink'
          routeNames=(array 'testRoute')
          priority='primary'
        }}
          title
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').prop('target'),
        'target should not be set set'
      ).to.equal('')
    })

    it('text is set', function () {
      this.render(hbs`
        {{frost-link
          hook='myLink'
          routeNames=(array 'testRoute')
          priority='primary'
          text='title'
        }}
      `)

      expect(
        this.$('.frost-link').text().trim(),
        'text is set'
      ).to.equal('title')
    })
  })

  describe('Priority property', function () {
    it('has primary class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          priority='primary'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('primary'),
        'primary class is set'
      ).to.equal(true)
    })

    it('has secondary class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          priority='secondary'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('secondary'),
        'secondary class is set'
      ).to.equal(true)
    })
  })

  describe('Size property', function () {
    it('has small class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          size='small'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('small'),
        'small class is set'
      ).to.equal(true)
    })

    it('has medium class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          size='medium'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('medium'),
        'medium class is set'
      ).to.equal(true)
    })

    it('has large class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          size='large'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('large'),
        'large class is set'
      ).to.equal(true)
    })
  })

  describe('Design property', function () {
    it('has info-bar class set', function () {
      this.render(hbs`
        {{#frost-link 'testRoute'
          design='info-bar'
          hook='myLink'
        }}
          Yielded content
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('info-bar'),
        'info-bar class is set'
      ).to.equal(true)
    })

    it('has inline class set', function () {
      this.render(hbs`
        {{#frost-link 'testRoute'
          design='inline'
          hook='myLink'
        }}
          Yielded content
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('inline'),
        'inline class is set'
      ).to.equal(true)
    })
  })

  it('sets disabled property', function () {
    this.render(hbs`
      {{frost-link 'title' 'testRoute'
          disabled=true
          hook='myLink'
      }}
    `)

    expect(
      this.$('.frost-link').hasClass('disabled'),
      'disabled class is set'
    ).to.equal(true)
  })

  it('sets icon property', function () {
    const priority = 'primary'

    this.set('priority', priority)

    this.render(hbs`
      {{frost-link 'title' 'testRoute'
        hook='myLink'
        priority=priority
      }}
    `)

    expect(
      this.$('.frost-icon-frost-open-tabs'),
      'icon property is set'
    ).to.have.length(1)
  })

  it('calls onClick closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-link 'title'
        hook='myLink'
        onClick=(action 'externalAction')
      }}
    `)

    this.$('a').trigger('click')

    return wait()
      .then(() => {
        expect(
          externalActionSpy.called,
          'onClick closure action called'
        ).to.equal(true)
      })
  })

  it('renders using spread', function () {
    this.render(hbs`
      {{frost-link
        options=(hash
          hook='myLink'
          priority='secondary'
          route='testRoute'
          text='title'
        )
      }}
    `)

    expect(
      this.$('.frost-link').hasClass('secondary'),
      'secondary class is set'
    ).to.equal(true)

    expect(
      this.$('.frost-link').text().trim(),
      'text is set'
    ).to.equal('title')

    // The route href needs to be tested against a running application
  })
})

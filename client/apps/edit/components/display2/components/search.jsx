import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import { SearchPreview } from './search_preview'
import { CharacterLimit } from 'client/components/character_limit'

export class DisplaySearch extends Component {
  static propTypes = {
    article: PropTypes.object,
    onChange: PropTypes.func
  }

  render () {
    const { article, onChange } = this.props
    return (
      <Row className='DisplaySearch'>
        <Col xs={4}>
          <div className='field-group'>
            <CharacterLimit
              label='Search Headline'
              limit={97}
              type='textarea'
              onChange={(value) => onChange('search_title', value)}
              defaultValue={article.get('search_title')}
            />
          </div>
          <div className='field-group'>
            <CharacterLimit
              label='Search Description'
              limit={160}
              type='textarea'
              onChange={(value) => onChange('search_description', value)}
              defaultValue={article.get('search_description')}
            />
          </div>
        </Col>

        <Col xs={8}>
          <SearchPreview article={article} />
        </Col>
      </Row>
    )
  }
}

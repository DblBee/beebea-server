import { Test, TestingModule } from '@nestjs/testing';
import { SnakeNamingStrategy } from './snake-naming.strategy';

describe('Snake Naming Strategy', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
  });

  it('should be defined', () => {
    const snakeNamingStrategy = new SnakeNamingStrategy();

    expect(snakeNamingStrategy).toBeDefined();

    expect(snakeNamingStrategy.tableName('SomeClassName', null)).toEqual(
      'some_class_name',
    );

    expect(snakeNamingStrategy.columnName('SomeColumnName', null, [])).toEqual(
      'some_column_name',
    );

    expect(snakeNamingStrategy.relationName('SomeRationalName')).toEqual(
      'some_rational_name',
    );

    expect(
      snakeNamingStrategy.joinColumnName(
        'SomeRelationName',
        'SomeRefColumnName',
      ),
    ).toEqual('some_relation_name_some_ref_column_name');

    expect(
      snakeNamingStrategy.joinTableName(
        'TableOne',
        'TableTwo',
        'PropOne',
        null,
      ),
    ).toEqual('table_one_prop_one_table_two');

    expect(
      snakeNamingStrategy.joinTableColumnName('TableOne', 'ColumnOne'),
    ).toEqual('table_one_column_one');

    expect(
      snakeNamingStrategy.classTableInheritanceParentColumnName(
        'TableOne',
        'PropOne',
      ),
    ).toEqual('table_one_prop_one');
  });
});
